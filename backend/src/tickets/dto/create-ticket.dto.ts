export class CreateTicketDto {
  issue: string;
  description: string;
  tags: string[];
  type: string;
  severity: string;
  priority: string;
  status: string;
  from: string;
}
