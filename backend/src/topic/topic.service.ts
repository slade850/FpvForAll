import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Topic } from './topic.entity';
import { TopicDto } from './dto/topic.dto';
import { TopicRepository } from './topic.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TopicUpdateDto } from './dto/topic-update.dto';
import { SectionsService } from '../section/sections.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class TopicService {

    constructor(
        @InjectRepository(TopicRepository)
        private topicRepository: TopicRepository,
        private readonly sectionsService: SectionsService,
        private usersService: UsersService
    ){}

    async getTopic(name): Promise<Topic []> {
      const section = await this.sectionsService.getSectionByName(name);
      return this.topicRepository.getTopics(section.id);
    }

    async getTopicById(id: number): Promise<Topic>{
        const found = await this.topicRepository.getTopicDetail(id);
        if (!found){
          throw new  NotFoundException(`Topic with ID: ${id} not found`);
        }
        return found;
    }

    async createTopic(topicDto: TopicDto, name, req): Promise<Topic> {
      const section = await this.sectionsService.getSectionByName(name);
      return this.topicRepository.createTopic(topicDto, section.id, req.user.id);
    }

    async deleteTopic(id: number, req): Promise<void> {
      const user = await this.usersService.findById(req.user.id);
        if(user.admin){
          const result = await this.topicRepository.delete(id);
          if(result.affected === 0){
            throw new  NotFoundException(`Topic with ID: ${id} not found`);
          }
        }
    }

    async updateTopic(id: number, topicUpdateDto: TopicUpdateDto, req) {
      const topic = await this.topicRepository.getTopicDetail(id);
        const user = await this.usersService.findById(req.user.id);
        if(user.username == topic.editor.username|| user.admin){
          return this.topicRepository.update(id, topicUpdateDto);
        }
        throw new BadRequestException({error: "vous ne possédez pas les droits sur ce topic"});  
    }

}
