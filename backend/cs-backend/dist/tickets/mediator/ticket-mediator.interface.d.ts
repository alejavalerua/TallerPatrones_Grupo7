export interface ITicketMediator {
    notifyStatusChange(ticketId: bigint, newStatus: bigint): Promise<void>;
    notifyAssigneeChange(ticketId: bigint, newAssigneeId: bigint | null): Promise<void>;
    notifyPriorityChange(ticketId: bigint, newPriority: bigint): Promise<void>;
}
