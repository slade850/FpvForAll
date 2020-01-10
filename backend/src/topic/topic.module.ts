import { Module } from '@nestjs/common';
import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicRepository } from './topic.repository';
import { SectionsModule } from '../section/sections.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TopicRepository]), SectionsModule, UsersModule
  ],
  controllers: [TopicController],
  providers: [TopicService],
})
export class TopicModule {}
