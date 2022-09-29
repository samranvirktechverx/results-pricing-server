import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HomeownerModule } from './homeowner/homeowner.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI), HomeownerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
