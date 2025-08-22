import { Server, Socket } from 'socket.io';
export declare class RealtimeGateway {
    server: Server;
    onJoin(client: Socket, data: {
        ticketId: string;
    }): void;
    onLeave(client: Socket, data: {
        ticketId: string;
    }): void;
    emitNewMessage(ticketId: bigint, payload: any): void;
}
