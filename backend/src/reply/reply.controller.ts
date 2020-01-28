import { Controller, Get, Post, Body, UsePipes, ValidationPipe, Patch, Param, Delete, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { ReplysService } from './reply.service';
import { ReplyDto } from './dto/reply.dto';
import { AuthGuard } from '@nestjs/passport';
import { ReplyUpdateDto } from './dto/replyUpdate.dto';

@Controller('topic/:id/replys')
export class ReplysController {
    constructor(private replysService: ReplysService) {}
    
    
    @Get()
    getReplys(@Param('id', ParseIntPipe) id: number) {
        return this.replysService.getReplys(id);
    }

    @Get('/:idr')
    getReply(@Param('idr', ParseIntPipe) idr: number) {
        return this.replysService.getReply(idr);
    }

    @UseGuards(AuthGuard('jwt')) 
    @Post()
    @UsePipes(ValidationPipe)
        createReply(@Param('id', ParseIntPipe) id: number, @Body() ReplyDto: ReplyDto, @Request() req){
            return this.replysService.createReply(ReplyDto, id, req);
        }

    @UseGuards(AuthGuard('jwt'))    
    @Patch('/:idr')
    @UsePipes(ValidationPipe)
        updateReply(@Param('idr', ParseIntPipe) idr: number, @Body() replyUpdateDto: ReplyUpdateDto, @Request() req){
            return this.replysService.updateReply(idr, replyUpdateDto, req);
        }    
    
    @UseGuards(AuthGuard('jwt'))
    @Delete('/:idr')
    deleteCategory(@Param('idr', ParseIntPipe) idr:number, @Request() req ): void {
            this.replysService.deleteReply(idr, req);
        }    
}
