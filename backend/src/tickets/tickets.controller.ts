import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TicketsService } from './tickets.service';

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
    console.log(createTicketDto);
    const generatedId = await this.ticketsService.create(createTicketDto);
    return { id: generatedId };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTicketDto: CreateTicketDto,
  ) {
    return await this.ticketsService.update(id, updateTicketDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.ticketsService.delete(id);
  }
}
