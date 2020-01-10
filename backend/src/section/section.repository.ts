import { EntityRepository, Repository } from 'typeorm';
import { Section } from './section.entity';
import { CreateSectionDto } from './dto/create-section.dto';
import { BadRequestException } from '@nestjs/common';

@EntityRepository(Section)
export class SectionRepository extends Repository<Section>{
    async createSection(createSectionDto: CreateSectionDto, admin): Promise<Section> {

        if(admin){
            const {name} = createSectionDto;

            const section = new Section();
            section.name = name;

            await section.save();

            return section;
        }
        throw new BadRequestException({error: "vous ne disposez pas des droits requis"})
    }

    async getSection(): Promise<Section []> {
        const query = this.createQueryBuilder('sections');

        const sections = await query.getMany();

        return sections;
    }

    async getSectionByName(name): Promise<Section> {
        const sections = await Section.findOne({name: name})

        return sections;
    }

}

