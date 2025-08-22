import { PrismaService } from '../../prisma/prisma.service';
import { ITicketMediator } from './ticket-mediator.interface';
export declare class TicketMediator implements ITicketMediator {
    private prisma;
    constructor(prisma: PrismaService);
    notifyStatusChange(ticketId: bigint, newStatus: bigint): Promise<void>;
    notifyAssigneeChange(ticketId: bigint, newAssigneeId: bigint | null): Promise<void>;
    notifyPriorityChange(ticketId: bigint, newPriority: bigint): Promise<void>;
}
