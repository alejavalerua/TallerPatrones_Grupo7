import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ITicketMediator } from './ticket-mediator.interface';

@Injectable()
export class TicketMediator implements ITicketMediator {
    constructor(private prisma: PrismaService) {}

    async notifyStatusChange(ticketId: bigint, newStatus: bigint): Promise<void> {
        await this.prisma.tickets.update({
            where: { id: ticketId },
            data: { 
                status: newStatus,
                updated_at: new Date()
            }
        });
        
        console.log(`Ticket ${ticketId} changed status to ${newStatus}`);
    }

    async notifyAssigneeChange(ticketId: bigint, newAssigneeId: bigint | null): Promise<void> {
        await this.prisma.tickets.update({
            where: { id: ticketId },
            data: { 
                assignee_id: newAssigneeId,
                updated_at: new Date()
            }
        });
        
        console.log(`Ticket ${ticketId} assigned to ${newAssigneeId}`);
    }

    async notifyPriorityChange(ticketId: bigint, newPriority: bigint): Promise<void> {
        await this.prisma.tickets.update({
            where: { id: ticketId },
            data: { 
                priority: newPriority,
                updated_at: new Date()
            }
        });
        
        console.log(`Ticket ${ticketId} priority changed to ${newPriority}`);
    }
}
