import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Article } from "../articles/article.entity";
import { User } from "../users/user.entity";

@Entity('comments')
export class Comment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @CreateDateColumn({type: "timestamp"})
    createdAt: Number;

    @UpdateDateColumn({type: "timestamp"})
    updatedAt: Number;
    
    @ManyToOne(type => Article, article => article.comments)
    article: Article;

    @ManyToOne(type => User, user => user.comments)
    editor: User;
}