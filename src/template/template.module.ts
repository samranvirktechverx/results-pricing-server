import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TemplateSchema } from './entities/template.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Template', schema: TemplateSchema }]),
  ],
  providers: [TemplateService],
  controllers: [TemplateController],
})
export class TemplateModule {}
