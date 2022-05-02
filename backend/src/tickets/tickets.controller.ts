import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TicketsService } from './tickets.service';

@UseGuards(JwtAuthGuard)
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  async index() {
    return await this.ticketsService.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.ticketsService.findOne(id);
  }

  @Post()
  async addTicket(@Body() createTicketDto: CreateTicketDto) {
    const newTicket = await this.ticketsService.create(createTicketDto);
    return { newTicket };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTicketDto: CreateTicketDto,
    @Request() req,
  ) {
    const jwt = req.headers.authorization;
    return await this.ticketsService.update(id, updateTicketDto, jwt);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req) {
    const jwt = req.headers.authorization;
    return await this.ticketsService.delete(id, jwt);
  }
}
