import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Article } from './article.entity';
import { ArticleDto } from './dto/article.dto';
import { ArticleRepository } from './article.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleUpdateDto } from './dto/article-update.dto';
import { SectionsService } from '../section/sections.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class ArticlesService {

    constructor(
        @InjectRepository(ArticleRepository)
        private articleRepository: ArticleRepository,
        private readonly sectionsService: SectionsService,
        private readonly usersService: UsersService
    ){}

    async getArticles(name): Promise<Article []> {
      const section = await this.sectionsService.getSectionByName(name);
      return this.articleRepository.getArticles(section.id);
    }

    async getArticleById(id: number): Promise<Article>{
        const found = await this.articleRepository.findOne(id);
        if (!found){
          throw new  NotFoundException(`Article with ID: ${id} not found`);
        }
        return found;
    }
    

    async createArticle(articleDto: ArticleDto, name, req): Promise<Article> {
      const user = await this.usersService.findById(req.user.id);
        if(user.admin){
          const section = await this.sectionsService.getSectionByName(name);
          return this.articleRepository.createArticle(articleDto, section.id);
        } else {
          throw new UnauthorizedException('operation non autoriser');
        }
    }

    async deleteArticle(id: number, req): Promise<void> {
      const user = await this.usersService.findById(req.user.id);
      if(user.admin){
        const result = await this.articleRepository.delete(id);
        if(result.affected === 0){
          throw new  NotFoundException(`Article with ID: ${id} not found`);
        }
      }  
    }

    async updateArticle(id: number, articleUpdateDto: ArticleUpdateDto, req) {
      const user = await this.usersService.findById(req.user.id);
        if(user.admin){
          return this.articleRepository.update(id, articleUpdateDto);
        } else {
          throw new UnauthorizedException('operation non autoriser');
        }
    }

}
