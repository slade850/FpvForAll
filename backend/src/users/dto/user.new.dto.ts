import { IsEmail, IsNotEmpty, Equals, MinLength } from 'class-validator';

export class NewUserDto {
    @IsNotEmpty({message:"indiquez votre nom d'utilisateurs"})
    username: string;

    @IsNotEmpty({message:"indiquez votre mot de passe"})
    @MinLength(6, {message:"votre mot de passe doit avoir 6 caractère minimum"})
    hash: string;
    
    @IsNotEmpty({message:"indiquez votre mot de passe"})
    hash2: string;

    @IsNotEmpty({message:"indiquez votre prénom"})
    firstName: string;

    @IsNotEmpty({message:"indiquez votre nom"})
    lastName: string;

    @IsEmail()
    email: string;
}