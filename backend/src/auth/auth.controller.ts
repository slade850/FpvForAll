import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @UseGuards(AuthGuard('jwt'))
    @Get('')
    checkAuth() {
        return {success: true};
    }

    @UseGuards(AuthGuard('local'))
    @Post('/login')
        async login(@Request() req) {
            return this.authService.login(req.user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/profile')
    getProfile(@Request() req) {
        return this.authService.getProfil(req.user.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/logout')
    logout(@Request() req){
        
    }
}
