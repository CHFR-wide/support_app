import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TicketDocument = Ticket & Document;

@Schema()
export class Ticket {
  @Prop() issue: string;
  @Prop() description: string;
  @Prop([String]) tags: string[];
  @Prop() type: string;
  @Prop() severity: string;
  @Prop() priority: string;
  @Prop() status: string;
  @Prop() from: string;
  @Prop() created: number;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
