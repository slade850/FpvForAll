import { Controller, Get, Post, Body, Param, Delete, Patch, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Article } from './article.entity';
import { ArticleDto as ArticleDto } from './dto/article.dto';
import { UpdateResult } from 'typeorm';
import { ArticleUpdateDto } from './dto/article-update.dto';
import { AuthGuard } from '@nestjs/passport';




@Controller(':name/articles')
export class ArticlesController {
    constructor(private articleService: ArticlesService){}
    
    @Get()
    getArticles(@Param('name') name: string ): Promise<Article[]> {
      return this.articleService.getArticles(name);
    }

    @Get('/:id')
    getArticleById(@Param('id', ParseIntPipe) id: number ): Promise<Article> {
      return this.articleService.getArticleById(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    createArticle(@Body()articleDto: ArticleDto, @Param('name') name: string): Promise<Article> {
      return this.articleService.createArticle(articleDto, name);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('/:id')
    deleteArticle(@Param('id', ParseIntPipe) id:number): Promise<void> {
      return this.articleService.deleteArticle(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('/:id')
    updateArticle(  
      @Param('id', ParseIntPipe) id: number,
      @Body()articleUpdateDto: ArticleUpdateDto
    ): Promise<UpdateResult>{
      return this.articleService.updateArticle(id,articleUpdateDto);
    }

}
