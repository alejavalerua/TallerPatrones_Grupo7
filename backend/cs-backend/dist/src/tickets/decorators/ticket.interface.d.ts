export interface ITicket {
    getTitle(): string;
    getDescription(): string;
    getPriority(): bigint;
    getStatus(): bigint;
    getCustomerId(): bigint | null;
    getAssigneeId(): bigint | null;
    toJSON(): any;
}
