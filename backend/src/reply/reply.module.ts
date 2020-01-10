import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReplysController } from './reply.controller';
import { ReplysService } from './reply.service';
import { ReplyRepository } from './reply.repository';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [
      TypeOrmModule.forFeature([ReplyRepository]), UsersModule
    ],
    controllers: [ReplysController],
    providers: [ReplysService],
  })
export class ReplyModule {}
