import { Injectable } from '@nestjs/common';
import { UserService } from '@root/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findUser(email);
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (user && isPasswordMatch) {
            return user;
        }
        return null;
    }

    async login(user: any) {
        user = await this.userService.findUser(user.email);

        return {
            data: {
                userDetail: user,
                uuid: this.jwtService.sign({ _id: user._id }),
            },
        };
    }
}
