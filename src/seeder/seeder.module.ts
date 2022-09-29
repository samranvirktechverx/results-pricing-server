import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@root/user/entities/user.entity';
import { UserRepository } from '@root/user/repositories/user.repository';
import { SeederController } from './seeder.controller';
import { SeederService } from './seeder.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [SeederController],
  providers: [SeederService, UserRepository],
})
export class SeederModule {}
