import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "../users/user.entity";

@Entity('PrivateMessages')
export class PrivateMessage extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    subject: string;

    @Column()
    content: string;

    @CreateDateColumn({type: "timestamp"})
    createdAt: Number;

    @UpdateDateColumn({type: "timestamp"})
    updatedAt: Number;

    @Column({default: true})
    viewSend: boolean;

    @Column({default: true})
    viewRecip: boolean;

    @ManyToOne(type => User, user => user.sendMessage)
    editor: User;

    @ManyToOne(type => User, user => user.recipMessage)
    recipient: User;
}