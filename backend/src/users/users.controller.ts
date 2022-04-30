import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private readonly ticketsService: UsersService) {}

  @Post('login')
  async find(@Body() loginUserDto: LoginUserDto) {
    return await this.ticketsService.findByUsername(loginUserDto.username);
  }

  @Post('register')
  async addTicket(@Body() registerUserDto: RegisterUserDto) {
    console.log(registerUserDto);
    const generatedId = await this.ticketsService.create(registerUserDto);
    return { id: generatedId };
  }
}
