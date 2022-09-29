import { Injectable } from '@nestjs/common';
import { UserService } from '@root/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '@root/user/repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findUser(email);
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (user && isPasswordMatch) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    user = await this.userRepository.findUser(user.email);

    return {
      data: {
        userDetail: user,
        uuid: this.jwtService.sign({ _id: user._id }),
      },
    };
  }
}
