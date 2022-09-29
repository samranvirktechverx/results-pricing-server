import { Module } from '@nestjs/common';
import { ContractService } from '@Contract/contract.service';
import { ContractController } from '@Contract/contract.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ContractSchema } from '@Contract/entities/contract.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Contract', schema: ContractSchema }])],
  providers: [ContractService],
  controllers: [ContractController]
})
export class ContractModule {}
