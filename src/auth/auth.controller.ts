import {
  Controller,
  Request,
  Get,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO } from '@root/user/dtos/create-user.dto';
import { UserService } from '@root/user/user.service';
import { AuthService } from '@root/auth/auth.service';
import { LocalAuthGuard } from '@root/auth/guards/local-auth.guard';
import { JwtAuthGuard } from '@root/auth/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
