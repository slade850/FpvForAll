import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { NewUserDto } from './dto/user.new.dto';
const bcrypt = require('bcrypt');

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ){}

    async creatUser(newUser: NewUserDto): Promise<User> {
        const userExist = await this.userRepository.findOne({username: newUser.username});
        const emailExist = await this.userRepository.findOne({email: newUser.email});

        if(newUser.hash != newUser.hash2){
            throw new BadRequestException({error: 'verifiez votre mot de passe'});
        }
        
        if(userExist && emailExist){
            throw new BadRequestException({error: "ce speudo et cette adresse mail sont deja utilisé"});
        }

        if(userExist){
            throw new BadRequestException({error: "ce speudo est deja utilisé"});
        }
        
        if(emailExist){
            throw new BadRequestException({error: "cette adresse mail est deja utilisé"});
        }
            const user = new User();
            user.username = newUser.username;
            user.email = newUser.email;
            user.firstName = newUser.firstName;
            user.lastName = newUser.lastName;
            await bcrypt.genSalt(10, function(err, wist) {
            bcrypt.hash(newUser.hash, wist, function(err, hash) {
                user.hash = hash;
                user.save();
            });
        });
        return user;
    }
        


    async findByName(username: string): Promise<User> {
        return this.userRepository.findOne({username: username});
    }

    async findById(id: string): Promise<User> {
        return this.userRepository.findOne({id: id});
    }
}
