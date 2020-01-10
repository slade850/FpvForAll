import {EntityRepository, Repository} from 'typeorm';
import {Article} from './article.entity';
import { ArticleDto } from './dto/article.dto';

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article>{

    async getArticles(id): Promise<Article []>{
        const query = this.createQueryBuilder('articles');

        query.innerJoinAndSelect('articles.section', 'section');

        const articles = await query.andWhere('articles.section = :id', { id: id }).getMany();
        return articles;
    }
    async createArticle(articleDto: ArticleDto, id): Promise<Article> {
        
        const article = new Article();
        
        article.title = articleDto.title;
        article.description = articleDto.description;
        article.imageUrl = articleDto.imageUrl;
        article.imageAlt = articleDto.imageAlt;
        article.section = id;
        article.content = articleDto.content;
        article.status = articleDto.status;
        await article.save();
        return article;
    }
}

