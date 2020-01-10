import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards, Request } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('sections')
export class SectionsController {
    constructor(private sectionsService: SectionsService){}

    @Get()
    getSections(){
        return this.sectionsService.getAllSections();
    }

    @Get('/:name')
    getSectionById(@Param('name') name: string){
        return this.sectionsService.getSectionByName(name);
    }

    @UseGuards(AuthGuard('jwt'))  
    @Post()
    @UsePipes(ValidationPipe)
        createSection(@Body() createSectionDto: CreateSectionDto, @Request() req){
            return this.sectionsService.createSection(createSectionDto, req);
        }

    @UseGuards(AuthGuard('jwt'))  
    @Patch('/:id')
    @UsePipes(ValidationPipe)
    updateSection(@Param('id') id: number, @Body() name: string,  @Request() req) {
        return this.sectionsService.updateSection(id, name, req);
    }

    @UseGuards(AuthGuard('jwt'))  
    @Delete('/:id')
    deleteSection(@Param('id') id:number, @Request() req): void {
        this.sectionsService.deleteSection(id, req);
    }
    

}
