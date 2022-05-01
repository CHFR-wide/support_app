export interface TicketCreate {
  issue: string;
  description: string;
  tags: string[];
  type: string;
  severity: string;
  priority: string;
  status: string;
  from: string;
}
