import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { NewUserDto } from './dto/user.new.dto';
import { unlink } from 'fs';
import { UpdateUserDto } from './dto/user.update.dto';
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
        
    async updateUser(id, userUpdate){
        const user = userUpdate;
        if(userUpdate.hash != null && userUpdate.hash == userUpdate.hash2){
            await bcrypt.genSalt(10, function(err, wist) {
                bcrypt.hash(userUpdate.hash, wist, function(err, hash) {
                    user.hash = hash;
                });
            })
        };
        this.userRepository.update(id, user);
    }


    async findByName(username: string): Promise<User> {
        return this.userRepository.findOne({username: username});
    }

    async findById(id: string): Promise<User> {
        return this.userRepository.findOne({id: id});
    }

    public async setAvatar(id, avatarUrl: string){
        const user = await this.findById(id);
        if(user.avatar != 'http://localhost:3000/user/image/051cscrat.jpg'){
            const avatar = user.avatar.split('/').reverse();
            unlink(`./files/${avatar[0]}`, (err) => {
                if (err) throw err;
                console.log('successfully deleted');
            });
        }
        this.userRepository.update(id, {avatar: avatarUrl});
    }
}
