import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketsModule } from './tickets/tickets.module';
import { MessagesModule } from './messages/messages.module';
import { RealtimeGateway } from './realtime/realtime.gateway';

@Module({
  imports: [TicketsModule, MessagesModule],
  controllers: [AppController],
  providers: [AppService, RealtimeGateway],
})
export class AppModule {}
