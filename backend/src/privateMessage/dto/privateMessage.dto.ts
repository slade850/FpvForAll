import { User } from "../../users/user.entity";

export class PrivateMessageDto {
    subject: string;
    content: string;
    editor: User;
    recipient: User;
    sendTo: string;
}