import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';

@Module({
        imports: [TypeOrmModule.forFeature([User])],
        providers: [UsersService],
        controllers: [UserController],
        exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
