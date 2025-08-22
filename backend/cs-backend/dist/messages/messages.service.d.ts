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
            name: string | null;
            email: string;
        } | null;
    } & {
        id: bigint;
        created_at: Date;
        content: string;
        ticket_id: bigint | null;
        sender_id: bigint | null;
    })[]>;
    create(ticketId: bigint, content: string, senderId: bigint): Promise<{
        profiles: {
            id: bigint;
            name: string | null;
            email: string;
        } | null;
    } & {
        id: bigint;
        created_at: Date;
        content: string;
        ticket_id: bigint | null;
        sender_id: bigint | null;
    }>;
    remove(ticketId: bigint, messageId: bigint): Promise<{
        ok: boolean;
    }>;
}
