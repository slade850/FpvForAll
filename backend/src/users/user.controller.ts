import { Controller, Post, Body, UseGuards, UseInterceptors, UploadedFile, Get, Param, Res, Request, Patch } from '@nestjs/common';
import { FileInterceptor } from  '@nestjs/platform-express';
import { NewUserDto } from './dto/user.new.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { diskStorage } from  'multer';
import { editFileName, imageFileFilter } from '../file-upload.utils';
import { UpdateUserDto } from './dto/user.update.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UsersService){}
    
    @Post()
    createUser(@Body()newUser: NewUserDto): Promise<User> {
      return this.userService.creatUser(newUser);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/image')
    @UseInterceptors(
      FileInterceptor('image', {
        storage: diskStorage({
          destination: './files',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      }),
    )
    async uploadedFile(@UploadedFile() file, @Request() req) {
      this.userService.setAvatar(req.user.id, `http://localhost:3000/user/image/${file.filename}`);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch()
    updateUser(@Body()updateUser: UpdateUserDto, @Request() req){
      this.userService.updateUser(req.user.id, updateUser);
    }

    @Get('/image/:img')
    seeUploadedFile(@Param('img') img, @Res() res) {
      return res.sendFile(img, { root: './files' });
}
}
