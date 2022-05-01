export interface TicketGet {
  _id: string;
  issue: string;
  description: string;
  tags: string[];
  type: string;
  severity: string;
  priority: string;
  status: string;
  from: string;
  created: number;
}
