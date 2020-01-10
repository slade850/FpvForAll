import { Repository, EntityRepository } from "typeorm";
import { CommentDto } from "./dto/comment.dto";
import { Comment } from './comment.entity';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {

    async getComments(id): Promise<Comment []> {

        const query = this.createQueryBuilder('comments');

        const comments = await query.andWhere('comments.article = :id', { id: id }).getMany();

        return comments;
    }
    
    async createComment(commentDto: CommentDto): Promise<Comment> {
        
        const comment = new Comment();
        
        comment.content = commentDto.content;
        comment.editor = commentDto.editor;
        comment.article = commentDto.article;

        await comment.save();
        return comment;
    }
}