import { Module } from '@nestjs/common';
import { AuthService } from '@root/auth/auth.service';
import { UserModule } from '@root/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '@root/auth/strategies/local.strategy';
import { JwtStrategy } from '@root/auth/strategies/jwt.strategy';
import { AuthController } from '@root/auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule { }
