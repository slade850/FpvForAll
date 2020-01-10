import { Injectable, BadRequestException } from '@nestjs/common';
import { ReplyRepository } from './reply.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Reply } from './reply.entity';
import { ReplyDto } from './dto/reply.dto';
import { UpdateResult, DeleteResult } from 'typeorm';
import { UsersService } from '../users/users.service';


@Injectable()
export class ReplysService {

    constructor(
        @InjectRepository(ReplyRepository)
        private replyRepository: ReplyRepository,
        private usersService: UsersService
    ){}

    async getReplys(id): Promise<Reply []> {
        return this.replyRepository.getReplys(id);
    }

    async createReply(replyDto: ReplyDto, id, req): Promise<Reply> {
        const reply = replyDto;
        reply.topic = id;
        reply.editor = req.user.id;
        return this.replyRepository.createReply(reply);
    }

    
    async updateReply(id, replyDto: ReplyDto, req): Promise<UpdateResult> {
        const reply = await this.replyRepository.getReplyEditor({id: id});
        const user = await this.usersService.findById(req.user.id);
        const { hash, ...result } = user;
        if(req.user.id === reply.editor || result.admin){
            return this.replyRepository.update(id, replyDto);
        }  
        throw new BadRequestException({error: "vous ne possédez pas les droits sur ce Replyaire"})  
    }

    async deleteReply(id, req): Promise<DeleteResult> {
        const reply = await this.replyRepository.getReplyEditor({id: id});
        const user = await this.usersService.findById(req.user.id);
        const { hash, ...result } = user;
        if(req.user.id === reply.editor || result.admin){
            return this.replyRepository.delete(id);
        }
        throw new BadRequestException({error: "vous ne possédez pas les droits sur ce Replyaire"})
    }

}
