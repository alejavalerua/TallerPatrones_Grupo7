export class CreateTicketDto {
  title!: string;
  description!: string;
  // opcionales
  status?: bigint;      // FK a ticket_status.id (default 1 en DB)
  priority?: bigint;    // FK a priority.id (default 2 en DB)
  customer_id?: bigint; // FK a profiles.id
  assignee_id?: bigint; // FK a profiles.id
}
