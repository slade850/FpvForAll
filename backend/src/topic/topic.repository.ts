import {EntityRepository, Repository} from 'typeorm';
import { Topic } from './topic.entity';
import { TopicDto } from './dto/topic.dto';

@EntityRepository(Topic)
export class TopicRepository extends Repository<Topic>{

    async getTopics(id): Promise<Topic []>{
        const query = this.createQueryBuilder('Topics');

        query.innerJoinAndSelect('Topics.section', 'section');

        const topics = await query.andWhere('Topics.section = :id', { id: id }).innerJoin('Topics.editor', 'editor').addSelect(['editor.username', 'editor.avatar']).getMany();
        return topics;
    }

    async getTopicDetail(id): Promise<Topic>{
        const query = this.createQueryBuilder('Topic');

        const topic = await query.where('Topic.id = :id', { id: id }).innerJoin('Topic.editor', 'editor').addSelect(['editor.username', 'editor.avatar']).getOne();
        return topic;
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

