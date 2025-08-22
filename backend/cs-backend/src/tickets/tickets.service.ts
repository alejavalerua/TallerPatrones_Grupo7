// src/tickets/tickets.service.ts
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { ITicket } from './decorators/ticket.interface';
import { TicketMediator } from './mediator/ticket-mediator';

// Implementación base del ticket
class BaseTicket implements ITicket {
  constructor(
    private readonly dto: CreateTicketDto,
    private readonly status: bigint = 1n,
    private readonly priority: bigint = 2n
  ) {}

  getTitle(): string { return this.dto.title; }
  getDescription(): string { return this.dto.description; }
  getPriority(): bigint { return this.priority; }
  getStatus(): bigint { return this.status; }
  getCustomerId(): bigint | null { return this.dto.customer_id ?? null; }
  getAssigneeId(): bigint | null { return this.dto.assignee_id ?? null; }

  toJSON() {
    return {
      title: this.getTitle(),
      description: this.getDescription(),
      status: this.getStatus(),
      priority: this.getPriority(),
      customer_id: this.getCustomerId(),
      assignee_id: this.getAssigneeId()
    };
  }
}

// Decorador para tickets urgentes
class UrgentTicketDecorator implements ITicket {
  constructor(private ticket: ITicket) {}

  getTitle(): string { return `🚨 URGENTE: ${this.ticket.getTitle()}`; }
  getDescription(): string { return `${this.ticket.getDescription()}\n[Atención inmediata requerida]`; }
  getPriority(): bigint { return 3n; }
  getStatus(): bigint { return this.ticket.getStatus(); }
  getCustomerId(): bigint | null { return this.ticket.getCustomerId(); }
  getAssigneeId(): bigint | null { return this.ticket.getAssigneeId(); }

  toJSON() {
    return {
      ...this.ticket.toJSON(),
      title: this.getTitle(),
      description: this.getDescription(),
      priority: this.getPriority(),
      isUrgent: true
    };
  }
}

@Injectable()
export class TicketsService {
  constructor(
    private prisma: PrismaService,
    private mediator: TicketMediator
  ) {}

  findAll(params?: {
  status?: bigint;
  priority?: bigint;
  assignee_id?: bigint;
  customer_id?: bigint;
  skip?: number;
  take?: number;
  search?: string;
}) {
  const { status, priority, assignee_id, customer_id, skip, take, search } = params || {};

  return this.prisma.tickets.findMany({
    where: {
      status,
      priority,
      assignee_id,
      customer_id,
      ...(search
        ? { OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ] }
        : {}),
    },
    orderBy: { created_at: 'desc' },
    skip,
    take,
    include: {
      ticket_status: true, // { id, status }
      priority_tickets_priorityTopriority: true, // { id, priority }
      profiles_tickets_assignee_idToprofiles: { select: { id: true, name: true, email: true } },
      profiles_tickets_customer_idToprofiles: { select: { id: true, name: true, email: true } },
    },
  });
}

findOne(id: bigint) {
  return this.prisma.tickets.findUnique({
    where: { id },
    include: {
      ticket_status: true,
      priority_tickets_priorityTopriority: true,
      profiles_tickets_assignee_idToprofiles: { select: { id: true, name: true, email: true } },
      profiles_tickets_customer_idToprofiles: { select: { id: true, name: true, email: true } },
    },
  });
}

  async create(dto: CreateTicketDto) {
    // Crear ticket base
    let ticket: ITicket = new BaseTicket(dto);

    // Aplicar decoradores según condiciones
    if (dto.priority && dto.priority >= 3n) {
      ticket = new UrgentTicketDecorator(ticket);
    }

    // Obtener datos finales
    const ticketData = ticket.toJSON();

    return this.prisma.tickets.create({
      data: {
        ...ticketData,
        updated_at: new Date()
      }
    });
  }

  async update(id: bigint, dto: UpdateTicketDto) {
    // Validaciones FK similares si vienen campos
    if (dto.customer_id !== undefined && dto.customer_id !== null) {
      const exists = await this.prisma.profiles.findUnique({ where: { id: dto.customer_id } });
      if (!exists) throw new BadRequestException('customer_id no existe');
    }
    if (dto.assignee_id !== undefined && dto.assignee_id !== null) {
      const exists = await this.prisma.profiles.findUnique({ where: { id: dto.assignee_id } });
      if (!exists) throw new BadRequestException('assignee_id no existe');
    }
    if (dto.status !== undefined) {
      const exists = await this.prisma.ticket_status.findUnique({ where: { id: dto.status } });
      if (!exists) throw new BadRequestException('status no válido');
    }
    if (dto.priority !== undefined) {
      const exists = await this.prisma.priority.findUnique({ where: { id: dto.priority } });
      if (!exists) throw new BadRequestException('priority no válida');
    }
    return this.prisma.tickets.update({
      where: { id },
      data: { ...dto, updated_at: new Date(), },
    });
  }

  delete(id: bigint) {
    return this.prisma.tickets.delete({ where: { id } });
  }

  async assign(id: bigint, assignee_id: bigint | null) {
        if (assignee_id !== null) {
            const agent = await this.prisma.profiles.findUnique({ where: { id: assignee_id } });
            if (!agent) throw new BadRequestException('assignee_id no existe');
        }
        
        await this.mediator.notifyAssigneeChange(id, assignee_id);
        return this.prisma.tickets.findUnique({
            where: { id },
            include: { ticket_status: true, profiles_tickets_assignee_idToprofiles: true },
        });
    }

    async setStatus(id: bigint, status: bigint) {
        const exists = await this.prisma.ticket_status.findUnique({ where: { id: status } });
        if (!exists) throw new BadRequestException('status no válido');
        
        await this.mediator.notifyStatusChange(id, status);
        return this.prisma.tickets.findUnique({
            where: { id },
            include: { ticket_status: true },
        });
    }

}
