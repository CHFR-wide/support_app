import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Ticket, TicketDocument } from './schemas/ticket.schema';
import { Model } from 'mongoose';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TicketsService {
  private tickets: Ticket[] = [];

  constructor(
    @InjectModel(Ticket.name)
    private readonly ticketModel: Model<TicketDocument>,
    private usersService: UsersService,
  ) {}

  async findAll(): Promise<Ticket[]> {
    return await this.ticketModel.find().exec();
  }

  async findOne(id: string): Promise<Ticket> {
    return await this.ticketModel.findById(id).exec();
  }

  async create(ticket: CreateTicketDto): Promise<Ticket> {
    const newTicket = new this.ticketModel({ ...ticket, created: Date.now() });
    const result = await newTicket.save();
    return result;
  }

  async update(id: string, ticket: Partial<Ticket>, username: string) {
    await this.canModify(id, username);
    await this.ticketModel.findByIdAndUpdate(id, ticket).exec();
    return this.ticketModel.findById(id);
  }

  async delete(id: string, username: string) {
    await this.canModify(id, username);
    return await this.ticketModel.findByIdAndDelete(id).exec();
  }
  // Backend Modification/Deletion authorization check, works but might need refactoring
  async canModify(id: string, username: string) {
    const found = await this.ticketModel.findById(id);
    if (found === null) return;
    const isMod = await this.usersService.isModerator(username);
    if (!isMod && found.from !== username) {
      throw new UnauthorizedException();
    }
  }
}
