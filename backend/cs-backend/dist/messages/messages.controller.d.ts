import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    list(ticketId: string, take?: string, cursor?: string): Promise<({
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
    create(ticketId: string, body: CreateMessageDto): Promise<{
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
    remove(ticketId: string, messageId: string): Promise<{
        ok: boolean;
    }>;
}
