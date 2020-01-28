import { Repository, EntityRepository } from "typeorm";
import { ReplyDto } from "./dto/reply.dto";
import { Reply } from './reply.entity';

@EntityRepository(Reply)
export class ReplyRepository extends Repository<Reply> {

    async getReplys(id): Promise<Reply []> {

        const query = this.createQueryBuilder('replys');
        query.andWhere('replys.topic = :id', { id: id });

        const replys = await query.innerJoin('replys.editor', 'editor').addSelect(['editor.username', 'editor.avatar']).getMany();

        return replys;
    }

    async getReply(id): Promise<Reply> {

        const query = this.createQueryBuilder('reply');
        query.andWhere('reply.id = :id', { id: id });

        const reply = await query.innerJoin('reply.editor', 'editor').addSelect(['editor.username', 'editor.avatar']).getOne();

        return reply;
    }

    async getReplyEditor(id): Promise<Reply >{
        const query = this.createQueryBuilder('reply');
        const reply = query.andWhere('reply.id = :id', { id: id }).innerJoinAndSelect('reply.editor', 'editor').getOne();
        return reply;
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