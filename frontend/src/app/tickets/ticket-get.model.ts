export interface TicketGet {
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
