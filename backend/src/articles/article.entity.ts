import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne} from 'typeorm';
import { Section } from '../section/section.entity';
import { Comment } from '../comments/comment.entity';


@Entity('articles')
export class Article extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;
    
    @Column({nullable: true})
    imageUrl?: string;
    
    @Column({nullable: true})
    imageAlt?: string;
    
    @Column()
    description: string;
    
    @Column()
    content: string;

    @Column()
    status: string;

    @CreateDateColumn({type: "timestamp"})
    createdAt: Number;

    @UpdateDateColumn({type: "timestamp"})
    updatedAt: Number;

    @ManyToOne(type => Section, section => section.articles)
    section: Section;

    @OneToMany(type => Comment, comment => comment.article)
    comments: Comment[];

}