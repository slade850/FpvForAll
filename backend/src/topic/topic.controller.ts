import { Controller, Get, Post, Body, Param, Delete, Patch, ParseIntPipe, UseGuards, UsePipes, ValidationPipe, Request } from '@nestjs/common';
import { TopicService } from './topic.service';
import { Topic } from './topic.entity';
import { TopicDto } from './dto/topic.dto';
import { UpdateResult } from 'typeorm';
import { TopicUpdateDto } from './dto/topic-update.dto';
import { AuthGuard } from '@nestjs/passport';




@Controller(':name/topics')
export class TopicController {
    constructor(private topicService: TopicService){}
    
    @Get()
    getPosts(@Param('name') name: string ): Promise<Topic[]> {
      return this.topicService.getTopic(name);
    }

    @Get('/:id')
    getPostById(@Param('id', ParseIntPipe) id: number ): Promise<Topic> {
      return this.topicService.getTopicById(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    @UsePipes(ValidationPipe)
    createPost(@Body()topicDto: TopicDto,  @Param('name') name: string, @Request() req): Promise<Topic> {
      return this.topicService.createTopic(topicDto, name, req);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('/:id')
    deletePost(@Param('id', ParseIntPipe) id:number): Promise<void> {
      return this.topicService.deleteTopic(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('/:id')
    updatePost(  
      @Param('id', ParseIntPipe) id: number,
      @Body()topicUpdateDto: TopicUpdateDto
    ): Promise<UpdateResult>{
      return this.topicService.updateTopic(id,topicUpdateDto);
    }

}
