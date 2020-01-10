import { Injectable, BadRequestException } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { CommentDto } from './dto/comment.dto';
import { UpdateResult, DeleteResult } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class CommentsService {

    constructor(
        @InjectRepository(CommentRepository)
        private commentRepository: CommentRepository,
        private usersService: UsersService
    ){}

    async getComments(id): Promise<Comment []> {
        return this.commentRepository.getComments(id);
    }

    async createComment(commentDto: CommentDto, id, req): Promise<Comment> {
        const comment = commentDto;
        comment.article = id;
        comment.editor = req.user.id;
        return this.commentRepository.createComment(comment);
    }

    
    async updateComment(id, commentDto: CommentDto, req): Promise<UpdateResult> {
        const comment = await this.commentRepository.findOne({id: id});
        if(req.user.id === comment.editor || req.user.admin){
            return this.commentRepository.update(id, commentDto);
        }  
        throw new BadRequestException({error: "vous ne possédez pas les droits sur ce commentaire"})  
    }

    async deleteComment(id, req): Promise<DeleteResult> {
        const comment = await this.commentRepository.findOne({id: id});
        const user = await this.usersService.findById(id);
        const { hash, ...result } = user;
        if(req.user.id === comment.editor || result.admin){
            return this.commentRepository.delete(id);
        }
        throw new BadRequestException({error: "vous ne possédez pas les droits sur ce commentaire"})
    }

}
