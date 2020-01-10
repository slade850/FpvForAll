import { Module } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { SectionsController } from './sections.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionRepository } from './section.repository';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SectionRepository]), UsersModule
  ],
  controllers: [SectionsController],
  providers: [SectionsService],
  exports: [SectionsService]
})
export class SectionsModule {}
