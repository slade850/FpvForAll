import { Repository, EntityRepository } from "typeorm";
import { ReplyDto } from "./dto/reply.dto";
import { Reply } from './reply.entity';

@EntityRepository(Reply)
export class ReplyRepository extends Repository<Reply> {

    async getReplys(id): Promise<Reply []> {

        const query = this.createQueryBuilder('replys');

        const replys = await query.andWhere('replys.topic = :id', { id: id }).getMany();

        return replys;
    }

    async getReplyEditor(id): Promise<Reply >{
        const query = this.createQueryBuilder('reply').andWhere('reply.id = :id', { id: id }).innerJoinAndSelect('reply.editor', 'editor').getOne();
        return query;
    }
    
    async createReply(replyDto: ReplyDto): Promise<Reply> {
        
        const reply = new Reply();
        
        reply.content = replyDto.content;
        reply.editor = replyDto.editor;
        reply.topic = replyDto.topic;

        await reply.save();
        return reply;
    }
}