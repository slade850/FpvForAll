import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, 
        private readonly jwtService: JwtService) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findByName(username);
        if(user && user.isActive) {
            const match = await bcrypt.compare(password, user.hash);
            if (match){
                const { hash, ...result } = user;
                return result;
                }
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async getProfil(id: string) {
        const user = await this.usersService.findById(id);
        const { hash, ...result } = user;
        return result;
    }

}
