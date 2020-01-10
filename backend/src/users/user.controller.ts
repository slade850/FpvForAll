import { Controller, Post, Body } from '@nestjs/common';
import { NewUserDto } from './dto/user.new.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('user')
export class UserController {
    constructor(private userService: UsersService){}
    
    @Post()
    createUser(@Body()newUser: NewUserDto): Promise<User> {
      return this.userService.creatUser(newUser);
    }
}
