import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

// 👇 util para convertir BigInt -> string (recursivo)
function serializeBigInt(value: any): any {
  if (typeof value === 'bigint') return value.toString();
  if (Array.isArray(value)) return value.map(serializeBigInt);
  if (value && typeof value === 'object') {
    if (value instanceof Date) return value; // mantiene fechas
    const out: any = {};
    for (const [k, v] of Object.entries(value)) out[k] = serializeBigInt(v);
    return out;
  }
  return value;
}

@WebSocketGateway({
  cors: { origin: '*' }, // ajusta en prod
})
export class RealtimeGateway {
  @WebSocketServer() server!: Server;

  @SubscribeMessage('join')
  onJoin(@ConnectedSocket() client: Socket, @MessageBody() data: { ticketId: string }) {
    client.join(`ticket:${data.ticketId}`);
  }

  @SubscribeMessage('leave')
  onLeave(@ConnectedSocket() client: Socket, @MessageBody() data: { ticketId: string }) {
    client.leave(`ticket:${data.ticketId}`);
  }

  emitNewMessage(ticketId: bigint, payload: any) {
    const safe = serializeBigInt(payload); // 👈 convierte BigInt a string
    this.server.to(`ticket:${ticketId.toString()}`).emit('message:new', safe);
  }
}
