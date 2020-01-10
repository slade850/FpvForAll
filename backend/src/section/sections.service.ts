import { Injectable, NotFoundException, Param, BadRequestException } from '@nestjs/common';
import { Section } from './section.entity';
import { CreateSectionDto } from './dto/create-section.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SectionRepository } from './section.repository';
import { SectionDto } from './dto/section.dto';
import { UpdateResult, DeleteResult } from 'typeorm';
import { UsersService } from '../users/users.service';


@Injectable()
export class SectionsService {
  
    constructor(
        @InjectRepository(SectionRepository)
        private sectionRepository: SectionRepository,
        private readonly usersService: UsersService, 
    ){}
    async getAllSections(): Promise<Section []> {
        return this.sectionRepository.getSection();
    }
    async getSectionByName(name: string): Promise<Section> {
        const found = await this.sectionRepository.getSectionByName(name);
        if(!found) {
            throw new NotFoundException(`la section avec le nom: ${name} est introuvable`);
        }
        return found;
    }

    async createSection(createSectionDto: CreateSectionDto, req): Promise<Section> {
        const user = await this.usersService.findById(req.user.id);
        const { hash, ...result } = user;
        return this.sectionRepository.createSection(createSectionDto, result.admin);
    }

    
    async updateSection(id, name, req): Promise<UpdateResult> {
        const user = await this.usersService.findById(req.user.id);
        const { hash, ...result } = user;
        if(result.admin){
            return this.sectionRepository.update(id, name);
        }
        throw new BadRequestException({error: "vous ne disposez pas des droits requis"});
    }

    async deleteSection(id, req): Promise<DeleteResult> {
        const user = await this.usersService.findById(req.user.id);
        const { hash, ...result } = user;
        if(result.admin){
            return this.sectionRepository.delete(id);
        }
        throw new BadRequestException({error: "vous ne disposez pas des droits requis"})
    }
}