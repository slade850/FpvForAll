import { Injectable, BadRequestException } from '@nestjs/common';
import { PrivateMessageRepository } from './privateMessage.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { PrivateMessage } from './privateMessage.entity';
import { PrivateMessageDto } from './dto/privateMessage.dto';
import { UpdateResult, DeleteResult } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class PrivateMessagesService {

    constructor(
        @InjectRepository(PrivateMessageRepository)
        private privateMessageRepository: PrivateMessageRepository,
        private readonly usersService: UsersService
    ){}

    async getPrivateMessages(req): Promise<PrivateMessage []> {
        return this.privateMessageRepository.getPrivateMessages(req.user.id);
    }

    async createPrivateMessage(privateMessageDto: PrivateMessageDto, req): Promise<PrivateMessage> {
        privateMessageDto.recipient = await this.usersService.findByName(privateMessageDto.sendTo);
        const privateMessage = privateMessageDto;
        privateMessage.recipient = privateMessageDto.recipient;
        privateMessage.editor = req.user.id;
        return this.privateMessageRepository.createPrivateMessage(privateMessage);
    }

    
    async updatePrivateMessage(id, privateMessageDto: PrivateMessageDto, req): Promise<UpdateResult> {
        const privateMessage = await this.privateMessageRepository.getMessageById(id);
        if(req.user.id === privateMessage.editor.id){
            return this.privateMessageRepository.update(id, privateMessageDto);
        }  
        throw new BadRequestException({error: "vous ne possédez pas les droits sur ce Message"})  
    }

    async deletePrivateMessage(id, req): Promise<UpdateResult> {
        const privateMessage = await this.privateMessageRepository.getMessageById(id);
        if(req.user.id === privateMessage.editor.id){
            return this.privateMessageRepository.update(id, {viewSend: false})
        } else if (req.user.id === privateMessage.recipient.id) {
            return this.privateMessageRepository.update(id, {viewRecip: false})
        }
        throw new BadRequestException({error: "vous ne possédez pas les droits sur ce Message"})
    }

}
