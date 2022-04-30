import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

// Note to self : These auth guard files are only for avoiding the use of @UseGuards(AuthGuard('jwt')) in controllers.
