import { Controller, Request, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from '@User/dtos/create-user.dto';
import { UserService } from '@User/user.service';
import { AuthService } from '@Auth/auth.service';
import { LocalAuthGuard } from '@Auth/guards/local-auth.guard';
import { JwtAuthGuard } from '@Auth/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private userService: UserService) { }

    @Post('/register')
    async register(@Body() createUserDTO: CreateUserDTO) {
        const user = await this.userService.addUser(createUserDTO);
        return user;
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/user')
    getProfile(@Request() req) {
        return req.user;
    }

    @UseGuards(JwtAuthGuard)
    @Get('/user/:id')
    async getUser(@Request() req) {
        const user = await this.userService.findUserById(req.params.id);
        return user;
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('/admin')
    getDashboard(@Request() req) {
        return req.user;
    }
}