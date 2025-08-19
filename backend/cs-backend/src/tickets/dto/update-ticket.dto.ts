export class UpdateTicketDto {
  title?: string;
  description?: string;
  status?: bigint;      // p.ej. 2 => IN_PROGRESS
  priority?: bigint;    // p.ej. 3 => HIGH
  customer_id?: bigint;
  assignee_id?: bigint;
}
