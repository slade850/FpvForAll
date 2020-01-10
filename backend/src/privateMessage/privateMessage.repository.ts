import { Repository, EntityRepository } from "typeorm";
import { PrivateMessageDto } from "./dto/privateMessage.dto";
import { PrivateMessage } from './privateMessage.entity';

@EntityRepository(PrivateMessage)
export class PrivateMessageRepository extends Repository<PrivateMessage> {

    async getPrivateMessages(id): Promise<PrivateMessage []> {

        const query = this.createQueryBuilder('privateMessages');

        const privateMessages = await query.andWhere('privateMessages.editor = :id AND privateMessages.viewSend = true OR privateMessages.recipient = :id AND privateMessages.viewRecip = true', { id: id }).getMany();

        return privateMessages;
    }

    async getMessageById(id): Promise<PrivateMessage >{
        const query = this.createQueryBuilder('message').andWhere('message.id = :id', {id: id}).innerJoinAndSelect('message.editor', 'editor').innerJoinAndSelect('message.recipient', 'recipient').getOne();
        return query;
    }
    
    async createPrivateMessage(privateMessageDto: PrivateMessageDto): Promise<PrivateMessage> {
        
        const privateMessage = new PrivateMessage();
        
        privateMessage.subject = privateMessageDto.subject;
        privateMessage.content = privateMessageDto.content;
        privateMessage.editor = privateMessageDto.editor;
        privateMessage.recipient = privateMessageDto.recipient;

        await privateMessage.save();
        return privateMessage;
    }
}