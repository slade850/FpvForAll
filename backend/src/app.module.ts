import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UsersService } from './users/users.service';
import { UserController } from './users/user.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { ArticlesModule } from './articles/articles.module';
import { SectionsModule } from './section/sections.module';
import { CommentsModule } from './comments/comments.module';
import { TopicModule } from './topic/topic.module';
import { ReplyModule } from './reply/reply.module';
import { PrivateMessageModule } from './privateMessage/privateMessage.module';

@Module({
  imports: [ TypeOrmModule.forRoot(typeOrmConfig), UsersModule, AuthModule, ArticlesModule, SectionsModule, CommentsModule, TopicModule, ReplyModule, PrivateMessageModule ],
  providers: [UsersService, AuthService],
  controllers: [UserController, AuthController],
})
export class AppModule {}
