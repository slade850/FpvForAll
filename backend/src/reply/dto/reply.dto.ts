import { User } from "../../users/user.entity";
import { Topic } from "../../topic/topic.entity";

export class ReplyDto {
    content: string;
    editor: User;
    topic: Topic;
}