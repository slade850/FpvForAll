import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { Comment } from '../comments/comment.entity';
import { Topic } from "../topic/topic.entity";
import { Reply } from "../reply/reply.entity";
import { PrivateMessage } from "../privateMessage/privateMessage.entity";

@Entity('user')
export class User extends BaseEntity {
    
    @PrimaryGeneratedColumn('uuid') 
    id: string

    @Column('varchar', { length: 500, unique: true})
    username: string

    @Column()
    hash: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({unique: true})
    email: string

    @Column({default: 'http://localhost:3000/user/image/051cscrat.jpg'})
    avatar: string
    
    @Column({default: false})
    admin: boolean

    @Column({default: true})
    isActive: boolean

    @OneToMany(type => Comment, comment => comment.editor)
    comments: Comment;

    @OneToMany(type => Topic, topic => topic.editor)
    topics: Topic;

    @OneToMany(type => Reply, reply => reply.editor)
    replys: Reply;

    @OneToMany(type => PrivateMessage, privateMessage => privateMessage.editor)
    sendMessage: PrivateMessage;

    @OneToMany(type => PrivateMessage, privateMessage => privateMessage.recipient)
    recipMessage: PrivateMessage;

}