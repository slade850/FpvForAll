import { Controller, Get, Post, Body, UsePipes, ValidationPipe, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ReplysService } from './reply.service';
import { ReplyDto } from './dto/reply.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('topic/:id/replys')
export class ReplysController {
    constructor(private replysService: ReplysService) {}
    
    
    @Get()
    getReplys(@Param('id') id: number) {
        return this.replysService.getReplys(id);
    }

    @UseGuards(AuthGuard('jwt')) 
    @Post()
    @UsePipes(ValidationPipe)
        createReply(@Param('id') id: number, @Body() ReplyDto: ReplyDto, @Request() req){
            return this.replysService.createReply(ReplyDto, id, req);
        }

    @UseGuards(AuthGuard('jwt'))    
    @Patch('/:idr')
    @UsePipes(ValidationPipe)
        updateReply(@Param('idr') idr: number, @Body() replyDto: ReplyDto, @Request() req){
            return this.replysService.updateReply(idr, replyDto, req);
        }    
    
    @UseGuards(AuthGuard('jwt'))
    @Delete('/:idr')
    deleteCategory(@Param('idr') idr:number, @Request() req ): void {
            this.replysService.deleteReply(idr, req);
        }    
}
