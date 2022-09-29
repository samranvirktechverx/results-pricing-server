import { Module } from '@nestjs/common';
import { ContractService } from '@root/contract/contract.service';
import { ContractController } from '@root/contract/contract.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ContractSchema } from '@root/contract/entities/contract.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Contract', schema: ContractSchema }])],
  providers: [ContractService],
  controllers: [ContractController]
})
export class ContractModule {}
