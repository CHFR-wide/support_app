import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserInfos } from 'src/auth/user.decorators';
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
    @UserInfos() userInfos,
  ) {
    return await this.ticketsService.update(id, updateTicketDto, userInfos);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @UserInfos() userInfos) {
    return await this.ticketsService.delete(id, userInfos);
  }
}
