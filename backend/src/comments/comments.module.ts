import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentRepository } from './comment.repository';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [
      TypeOrmModule.forFeature([CommentRepository]), UsersModule
    ],
    controllers: [CommentsController],
    providers: [CommentsService],
  })
export class CommentsModule {}
