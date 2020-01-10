import { Controller, Get, Post, Body, UsePipes, ValidationPipe, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentDto } from './dto/comment.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('articles/:id/comments')
export class CommentsController {
    constructor(private commentsService: CommentsService) {}
    
    
    @Get()
    getComments(@Param('id') id: number) {
        return this.commentsService.getComments(id);
    }

    @UseGuards(AuthGuard('jwt')) 
    @Post()
    @UsePipes(ValidationPipe)
        createComment(@Param('id') id: number, @Body() commentDto: CommentDto, @Request() req){
            return this.commentsService.createComment(commentDto, id, req);
        }

    @UseGuards(AuthGuard('jwt'))    
    @Patch('/:id')
    @UsePipes(ValidationPipe)
        updateComment(@Param('id') id: number, @Body() commentDto: CommentDto, @Request() req){
            return this.commentsService.updateComment(id, commentDto, req);
        }    
    
    @UseGuards(AuthGuard('jwt'))
    @Delete('/:id')
    deleteCategory(@Param('id') id:number, @Request() req ): void {
            this.commentsService.deleteComment(id, req);
        }    
}
