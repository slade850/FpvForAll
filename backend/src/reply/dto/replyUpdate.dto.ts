import { User } from "../../users/user.entity";
import { Topic } from "../../topic/topic.entity";

export class ReplyUpdateDto {
    content?: string;
    editor?: User;
    topic?: Topic;
}