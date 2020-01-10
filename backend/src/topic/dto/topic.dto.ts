import { Section } from "../../section/section.entity";
import { Reply } from "../../reply/reply.entity";
import { User } from "../../users/user.entity";

export class TopicDto {
    title: string;
    content: string;
    publish: boolean;
    section: Section;
    reply: Reply[];
}