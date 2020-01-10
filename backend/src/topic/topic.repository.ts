import {EntityRepository, Repository} from 'typeorm';
import { Topic } from './topic.entity';
import { TopicDto } from './dto/topic.dto';

@EntityRepository(Topic)
export class TopicRepository extends Repository<Topic>{

    async getTopics(id): Promise<Topic []>{
        const query = this.createQueryBuilder('Topics');

        query.innerJoinAndSelect('Topics.section', 'section');

        const topics = await query.andWhere('Topics.section = :id', { id: id }).getMany();
        return topics;
    }
    async createTopic(topicDto: TopicDto, id, user): Promise<Topic> {
        
        const topic = new Topic();
        
        topic.title = topicDto.title;
        topic.section = id;
        topic.content = topicDto.content;
        topic.editor = user;
        await topic.save();
        return topic;
    }
}

