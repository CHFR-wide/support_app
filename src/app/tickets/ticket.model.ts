export interface Ticket {
  issue: string;
  description: string;
  tags: Array<string>;
  type: string;
  severity: string;
  priority: string;
  status: string;
  from: string;
  created: number;
}
