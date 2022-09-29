import { Module } from '@nestjs/common';
import { AppController } from '@root/app.controller';
import { AppService } from '@root/app.service';
import { UserModule } from '@root/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TemplateModule } from '@root/template/template.module';

import { ProposalModule } from '@root/proposal/proposal.module';
import { AuthModule } from '@root/auth/auth.module';
import { ContractModule } from '@root/contract/contract.module';
import { SeederModule } from './seeder/seeder.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UserModule,
    TemplateModule,
    ProposalModule,
    AuthModule,
    ContractModule,
    SeederModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
