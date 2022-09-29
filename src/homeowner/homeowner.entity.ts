import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IAddress, IPersons } from 'src/types';

export type HomeownerDocument = Homeowner & Document;

@Schema()
export class Homeowner {
  @Prop({
    type: [
      {
        firstName: {
          type: String,
          required: false,
        },
        detail: {
          type: String,
          required: false,
        },
        lastName: {
          type: String,
          required: false,
        },
        email: {
          type: String,
          trim: true,
          unique: false,
          required: true,
        },
        phone: {
          type: String,
          trim: true,
          minlength: 10,
          maxlength: 10,
          required: true,
        },
      },
    ],
  })
  persons: IPersons[];

  @Prop()
  clientManagerId: number;

  @Prop()
  hoaDate: string;

  @Prop()
  permitDate: string;

  @Prop()
  creatorId: string;

  @Prop()
  attachments: string[];

  @Prop({ required: false })
  notes: string;

  @Prop({ default: new Date() })
  created_at: Date;

  @Prop({ default: new Date() })
  updated_at: Date;

  @Prop({ default: true })
  enable: boolean;

  @Prop({ default: false })
  deleted: boolean;

  @Prop({ type: IAddress })
  address: IAddress;

  @Prop()
  proposal: string;

  @Prop()
  proposalCount: number;
}

export const HomeownerSchema = SchemaFactory.createForClass(Homeowner);
