import { PrismaService } from '../prisma/prisma.service';
import { RealtimeGateway } from '../realtime/realtime.gateway';
export declare class MessagesService {
    private prisma;
    private rt;
    constructor(prisma: PrismaService, rt: RealtimeGateway);
    listByTicket(ticketId: bigint, params?: {
        take?: number;
        cursor?: string;
    }): Promise<({
        profiles: {
            id: bigint;
            email: string;
            name: string | null;
        } | null;
    } & {
        id: bigint;
        content: string;
        ticket_id: bigint | null;
        sender_id: bigint | null;
        created_at: Date;
    })[]>;
    create(ticketId: bigint, content: string, senderId: bigint): Promise<{
        profiles: {
            id: bigint;
            email: string;
            name: string | null;
        } | null;
    } & {
        id: bigint;
        content: string;
        ticket_id: bigint | null;
        sender_id: bigint | null;
        created_at: Date;
    }>;
    remove(ticketId: bigint, messageId: bigint): Promise<{
        ok: boolean;
    }>;
}
