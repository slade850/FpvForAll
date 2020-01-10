import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "../users/user.entity";
import { Topic } from "../topic/topic.entity";

@Entity('Replys')
export class Reply extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @CreateDateColumn({type: "timestamp"})
    createdAt: Number;

    @UpdateDateColumn({type: "timestamp"})
    updatedAt: Number;
    
    @ManyToOne(type => Topic, topic => topic.replys)
    topic: Topic;

    @ManyToOne(type => User, user => user.replys)
    editor: User;
}