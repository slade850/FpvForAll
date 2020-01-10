import { Controller, Get, Post, Body, UsePipes, ValidationPipe, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { PrivateMessagesService } from './privateMessage.service';
import { PrivateMessageDto } from './dto/privateMessage.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user/Message')
export class PrivateMessageController {
    constructor(private privateMessageService: PrivateMessagesService) {}
    
    @UseGuards(AuthGuard('jwt'))
    @Get()
    getPrivateMessage(@Request() req) {
        return this.privateMessageService.getPrivateMessages(req);
    }

    @UseGuards(AuthGuard('jwt')) 
    @Post()
    @UsePipes(ValidationPipe)
        createPrivateMessage(@Body() privateMessageDto: PrivateMessageDto, @Request() req){
            return this.privateMessageService.createPrivateMessage(privateMessageDto, req);
        }

    @UseGuards(AuthGuard('jwt'))    
    @Patch('/:id')
    @UsePipes(ValidationPipe)
        updatePrivateMessage(@Param('id') id: number, @Body() privateMessageDto: PrivateMessageDto, @Request() req){
            return this.privateMessageService.updatePrivateMessage(id, privateMessageDto, req);
        }    
    
    @UseGuards(AuthGuard('jwt'))
    @Delete('/:id')
    delete(@Param('id') id:number, @Request() req ): void {
            this.privateMessageService.deletePrivateMessage(id, req);
        }    
}
