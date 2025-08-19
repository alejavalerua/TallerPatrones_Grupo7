// src/tickets/tickets.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService) {}

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
          ? { OR: [{ title: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } }] }
          : {}),
      },
      orderBy: { created_at: 'desc' },
      skip,
      take,
    });
  }

  findOne(id: bigint) {
    return this.prisma.tickets.findUnique({ where: { id } });
  }

  async create(dto: CreateTicketDto) {
    // Normaliza: si llegan strings vacíos, convíertelos a undefined
    const norm = {
      ...dto,
      status: dto.status ?? 1n,      // 1 = OPEN (debe existir)
      priority: dto.priority ?? 2n,  // 2 = MEDIUM (debe existir)
      customer_id: dto.customer_id ?? null,
      assignee_id: dto.assignee_id ?? null,
    };

    // Validaciones FK
    if (norm.customer_id !== null) {
      const exists = await this.prisma.profiles.findUnique({ where: { id: norm.customer_id } });
      if (!exists) throw new BadRequestException('customer_id no existe');
    }
    if (norm.assignee_id !== null) {
      const exists = await this.prisma.profiles.findUnique({ where: { id: norm.assignee_id } });
      if (!exists) throw new BadRequestException('assignee_id no existe');
    }
    if (norm.status !== undefined) {
      const exists = await this.prisma.ticket_status.findUnique({ where: { id: norm.status } });
      if (!exists) throw new BadRequestException('status no válido');
    }
    if (norm.priority !== undefined) {
      const exists = await this.prisma.priority.findUnique({ where: { id: norm.priority } });
      if (!exists) throw new BadRequestException('priority no válida');
    }
    
    return this.prisma.tickets.create({
      data: {
        title: dto.title,
        description: dto.description,
        status: dto.status ?? (1n),   // 1 = OPEN (asegúrate que existe)
        priority: dto.priority ?? (2n), // 2 = MEDIUM
        customer_id: dto.customer_id ?? null,
        assignee_id: dto.assignee_id ?? null,
        updated_at: new Date(), // mantén actualizado manualmente
      },
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
}
