import { Controller, Get, Post, Body, Param, Delete, Patch, ParseIntPipe, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Article } from './article.entity';
import { ArticleDto as ArticleDto } from './dto/article.dto';
import { UpdateResult } from 'typeorm';
import { ArticleUpdateDto } from './dto/article-update.dto';
import { AuthGuard } from '@nestjs/passport';




@Controller('articles')
export class ArticlesController {
    constructor(private articleService: ArticlesService){}
    
    @Get('/:name')
    getArticles(@Param('name') name: string ): Promise<Article[]> {
      return this.articleService.getArticles(name);
    }

    @Get('/:id')
    getArticleById(@Param('id', ParseIntPipe) id: number ): Promise<Article> {
      return this.articleService.getArticleById(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/:name')
    createArticle(@Body()articleDto: ArticleDto, @Param('name') name: string, @Request() req): Promise<Article> {
      return this.articleService.createArticle(articleDto, name, req);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('/:id')
    deleteArticle(@Param('id', ParseIntPipe) id:number, @Request() req): Promise<void> {
      return this.articleService.deleteArticle(id, req);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('/:id')
    updateArticle(  
      @Param('id', ParseIntPipe) id: number,
      @Body()articleUpdateDto: ArticleUpdateDto,
      @Request() req
    ): Promise<UpdateResult>{
        return this.articleService.updateArticle(id,articleUpdateDto, req);
    }

}
