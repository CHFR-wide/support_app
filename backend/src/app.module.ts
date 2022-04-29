import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketsModule } from './tickets/tickets.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/ps_db'), TicketsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
