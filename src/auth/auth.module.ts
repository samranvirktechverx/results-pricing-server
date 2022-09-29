import { Module } from '@nestjs/common';
import { AuthService } from '@Auth/auth.service';
import { UserModule } from '@User/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '@Auth/strategies/local.strategy';
import { JwtStrategy } from '@Auth/strategies/jwt.strategy';
import { AuthController } from '@Auth/auth.controller';
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
