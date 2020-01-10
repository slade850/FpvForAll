import { Section } from "src/section/section.entity";

export class ArticleUpdateDto {
    title?: string;
    description?: string;
    imageUrl?: string;
    imageAlt?: string;
    content?: string;
    status?: string;
    section?: Section;
    comments?: Comment[];
}