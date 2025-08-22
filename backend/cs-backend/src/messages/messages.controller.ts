import { Controller, Get, Post, Delete, Param, Body, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';

const toBI = (v?: string | null) =>
  v === undefined || v === null || v === '' ? undefined : BigInt(v);

@Controller('tickets/:ticketId/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  async list(
    @Param('ticketId') ticketId: string,
    @Query('take') take?: string,
    @Query('cursor') cursor?: string, // id del último mensaje recibido (para paginar)
  ) {
    return this.messagesService.listByTicket(BigInt(ticketId), {
      take: take ? Number(take) : undefined,
      cursor,
    });
  }

  @Post()
  async create(
    @Param('ticketId') ticketId: string,
    @Body() body: CreateMessageDto,
  ) {
    return this.messagesService.create(
      BigInt(ticketId),
      body.content,
      BigInt(body.sender_id),
    );
  }

  @Delete(':messageId')
  async remove(
    @Param('ticketId') ticketId: string,
    @Param('messageId') messageId: string,
  ) {
    return this.messagesService.remove(BigInt(ticketId), BigInt(messageId));
  }
}
