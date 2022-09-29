import { Module } from '@nestjs/common';
import { UserService } from '@User/user.service';
import { UserController } from '@User/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@User/entities/user.entity';
import { UserRepository } from '@User/repositories/user.repository';

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
