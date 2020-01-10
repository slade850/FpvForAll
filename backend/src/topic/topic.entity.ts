import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne} from 'typeorm';
import { Section } from '../section/section.entity';
import { Reply } from '../reply/reply.entity';
import { User } from '../users/user.entity';


@Entity('topics')
export class Topic extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;
    
    @Column()
    content: string;

    @Column({default: true})
    publish: boolean;

    @CreateDateColumn({type: "timestamp"})
    createdAt: Number;

    @UpdateDateColumn({type: "timestamp"})
    updatedAt: Number;

    @ManyToOne(type => Section, section => section.topics)
    section: Section;

    @OneToMany(type => Reply, reply => reply.topic)
    replys: Reply[];

    @ManyToOne(type => User, user => user.topics)
    editor: User;

}