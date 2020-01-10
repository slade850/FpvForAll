import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrivateMessageController } from './privateMessage.controller';
import { PrivateMessagesService } from './privateMessage.service';
import { PrivateMessageRepository } from './privateMessage.repository';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [
      TypeOrmModule.forFeature([PrivateMessageRepository]), UsersModule
    ],
    controllers: [PrivateMessageController],
    providers: [PrivateMessagesService],
  })
export class PrivateMessageModule {}
