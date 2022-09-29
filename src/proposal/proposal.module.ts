import { Module } from '@nestjs/common';
import { ProposalService } from './proposal.service';
import { ProposalController } from './proposal.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Proposal, ProposalSchema } from './entities/proposal.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Proposal.name, schema: ProposalSchema }]),
  ],
  providers: [ProposalService],
  controllers: [ProposalController],
  exports: [ProposalService],
})
export class ProposalModule { }
