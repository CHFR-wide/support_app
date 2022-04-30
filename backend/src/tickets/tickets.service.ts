import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Ticket, TicketDocument } from './schemas/ticket.schema';
import { Model } from 'mongoose';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Injectable()
export class TicketsService {
  private tickets: Ticket[] = [];

  constructor(
    @InjectModel(Ticket.name)
    private readonly ticketModel: Model<TicketDocument>,
  ) {}

  async findAll(): Promise<Ticket[]> {
    return await this.ticketModel.find().exec();
  }

  async findOne(id: string): Promise<Ticket> {
    return await this.ticketModel.findById(id).exec();
  }

  async create(ticket: CreateTicketDto): Promise<string> {
    const newTicket = new this.ticketModel({ ...ticket, created: Date.now() });
    const result = await newTicket.save();
    return result.id;
  }

  async update(id: string, ticket: Partial<Ticket>) {
    await this.ticketModel.findByIdAndUpdate(id, ticket).exec();
    return this.ticketModel.findById(id);
  }

  async delete(id) {
    return await this.ticketModel.findByIdAndDelete(id).exec();
  }
}
