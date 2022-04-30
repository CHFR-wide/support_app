import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RegisterUserDto } from 'src/users/dto/register-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { registerErrors } from './constants';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    const newUser = await this.usersService.create(registerUserDto);
    if (newUser == registerErrors.MISSING_FIELDS) {
      throw new HttpException(
        "Formulaire d'inscription incomplet.",
        HttpStatus.BAD_REQUEST,
      );
    } else if (newUser == registerErrors.USER_EXISTS) {
      throw new HttpException(
        "Nom d'utilisateur pris.",
        HttpStatus.BAD_REQUEST,
      );
    } else if (newUser == registerErrors.BAD_PW_CONF) {
      throw new HttpException(
        'Confirmation du mot de passe invalide.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.authService.login(newUser);
  }
}
