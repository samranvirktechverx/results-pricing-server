import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TemplateModule } from './template/template.module';
import { ProposalModule } from './proposal/proposal.module';
import { AuthModule } from './auth/auth.module';
import { ContractModule } from './contract/contract.module';

@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forRoot(process.env.MONGO_URI), UserModule, TemplateModule, ProposalModule, AuthModule, ContractModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
