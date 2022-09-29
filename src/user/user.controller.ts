import { Controller, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '@User/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post('/getAll')
    async getAll(@Req() req) {
        const users = await this.userService.getAll(req);  
        return users;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/createClient')
    async createClient(@Req() req) {
        const user = await this.userService.createClient(req);  
        return user;
    }
}

