import { Section } from "../../section/section.entity";
import { Reply } from "../../reply/reply.entity";

export class TopicUpdateDto {
    title?: string;
    content?: string;
    publish?: boolean;
    section?: Section;
    reply?: Reply[];
}