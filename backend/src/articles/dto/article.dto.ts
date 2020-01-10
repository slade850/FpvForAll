import { Section } from "src/section/section.entity";

export class ArticleDto {
    title: string;
    description: string;
    imageUrl?: string;
    imageAlt?: string;
    content: string;
    status: string;
    comments: Comment[];
}