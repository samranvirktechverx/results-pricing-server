import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose';
import { HomeownerService } from './homeowner.service';
import { HomeownerController } from './homeowner.controller';
import { HomeownerRepository } from './homeowner.repository';
import { Homeowner, HomeownerSchema } from './homeowner.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Homeowner.name, schema: HomeownerSchema }]),
  ],
  providers: [HomeownerService, HomeownerRepository],
  controllers: [HomeownerController]
})
export class HomeownerModule {}
