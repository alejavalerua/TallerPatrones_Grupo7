import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RealtimeGateway } from '../realtime/realtime.gateway';


const toBI = (v?: string | null) =>
  v === undefined || v === null || v === '' ? undefined : BigInt(v);

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService, private rt: RealtimeGateway) {}

  /**
   * Lista mensajes de un ticket, ordenados por fecha ascendente.
   * Paginado por cursor (id del último mensaje recibido).
   */
  async listByTicket(ticketId: bigint, params?: { take?: number; cursor?: string }) {
    
    const ticket = await this.prisma.tickets.findUnique({ where: { id: ticketId } });
    if (!ticket) throw new NotFoundException('ticket no existe');

    const take = params?.take ?? 30; // tamaño de página por defecto
    const cursorId = toBI(params?.cursor);

    return this.prisma.message.findMany({
      where: { ticket_id: ticketId },
      ...(cursorId ? { cursor: { id: cursorId }, skip: 1 } : {}),
      take,
      orderBy: { created_at: 'asc' },
      include: {
        profiles: { select: { id: true, name: true, email: true } }, // autor
      },
    });
  }

  /**
   * Crea un mensaje en el ticket.
   * Actualiza updated_at del ticket para reflejar actividad reciente.
   */
  async create(ticketId: bigint, content: string, senderId: bigint) {
    if (!content || !content.trim()) {
      throw new BadRequestException('content es requerido');
    }

    const [ticket, sender] = await Promise.all([
      this.prisma.tickets.findUnique({ where: { id: ticketId } }),
      this.prisma.profiles.findUnique({ where: { id: senderId } }),
    ]);
    if (!ticket) throw new NotFoundException('ticket no existe');
    if (!sender) throw new BadRequestException('sender_id no existe');

    const msg = await this.prisma.message.create({
      data: {
        content: content.trim(),
        ticket_id: ticketId,
        sender_id: senderId,
      },
      include: { profiles: { select: { id: true, name: true, email: true } } },
    });

    await this.prisma.tickets.update({
      where: { id: ticketId },
      data: { updated_at: new Date() },
    });

    // emite al room del ticket
    this.rt.emitNewMessage(ticketId, msg);

    return msg;
  }

 
  async remove(ticketId: bigint, messageId: bigint) {
    
    const msg = await this.prisma.message.findUnique({ where: { id: messageId } });
    if (!msg || msg.ticket_id !== ticketId) throw new NotFoundException('mensaje no existe en este ticket');

    await this.prisma.message.delete({ where: { id: messageId } });
    return { ok: true };
  }
}
