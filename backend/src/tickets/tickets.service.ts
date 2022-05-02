import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Ticket, TicketDocument } from './schemas/ticket.schema';
import { Model } from 'mongoose';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TicketsService {
  private tickets: Ticket[] = [];

  constructor(
    @InjectModel(Ticket.name)
    private readonly ticketModel: Model<TicketDocument>,
    private jwtService: JwtService,
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

  async update(id: string, ticket: Partial<Ticket>, jwt: string) {
    await this.canModify(id, jwt);
    await this.ticketModel.findByIdAndUpdate(id, ticket).exec();
    return this.ticketModel.findById(id);
  }

  async delete(id: string, jwt: string) {
    await this.canModify(id, jwt);
    return await this.ticketModel.findByIdAndDelete(id).exec();
  }

  // Is it better to decode a jwt everytime or query a user everytime?
  // This one does look a bit cleaner so I'll go with it
  async canModify(id: string, jwt: string) {
    jwt = jwt.replace('Bearer ', '');
    const jwtInfos = this.jwtService.decode(jwt, { json: true }) as {
      username: string;
      isModerator: boolean;
    };
    const found = await this.ticketModel.findById(id);
    if (found === null) return;
    if (!jwtInfos.isModerator && found.from !== jwtInfos.username) {
      throw new UnauthorizedException();
    }
  }
}
