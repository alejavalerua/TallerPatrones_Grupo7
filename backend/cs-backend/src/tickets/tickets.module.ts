import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { TicketMediator } from './mediator/ticket-mediator';

@Module({
  imports: [PrismaModule],
  controllers: [TicketsController],
  providers: [TicketsService, TicketMediator],
})
export class TicketsModule {}
