import { Module } from '@nestjs/common';
import { UserService } from '@root/user/user.service';
import { UserController } from '@root/user/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@root/user/entities/user.entity';
import { UserRepository } from '@root/user/repositories/user.repository';

import {
  Proposal,
  ProposalSchema,
} from '@root/proposal/entities/proposal.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Proposal.name, schema: ProposalSchema },
    ]),
  ],

  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [UserService, UserRepository],
})
export class UserModule { }
