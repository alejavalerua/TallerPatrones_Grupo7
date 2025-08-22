import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    list(ticketId: string, take?: string, cursor?: string): Promise<({
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
    create(ticketId: string, body: CreateMessageDto): Promise<{
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
    remove(ticketId: string, messageId: string): Promise<{
        ok: boolean;
    }>;
}
