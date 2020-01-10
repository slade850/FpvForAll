import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany} from 'typeorm';
import { Article } from '../articles/article.entity';
import { Topic } from '../topic/topic.entity';


@Entity('sections')
export class Section extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @CreateDateColumn({type: "timestamp"})
    createdAt: Number;

    @UpdateDateColumn({type: "timestamp"})
    updatedAt: Number;
    
    @OneToMany(type => Article, article => article.section)
    articles: Article[];

    @OneToMany(type => Topic, topic => topic.section)
    topics: Topic[];
}