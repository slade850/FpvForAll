import { Article } from "../../articles/article.entity";
import { User } from "src/users/user.entity";

export class CommentDto {
    content: string;
    editor: User;
    article: Article;
}