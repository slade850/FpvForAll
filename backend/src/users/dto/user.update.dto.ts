import { MinLength } from "class-validator";

export class UpdateUserDto {

    username?: string;

    @MinLength(6, {message:"votre mot de passe doit avoir 6 caractère minimum"})
    hash?: string;
    
    hash2?: string;

    email?: string;
}