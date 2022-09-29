import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Address } from 'src/user/interfaces/address.interface';
import mongoose, { Document } from 'mongoose';
import { Template } from 'src/template/entities/template.entity';
import { Proposal } from 'src/proposal/entities/proposal.entity';
import { JoiPipeModule, JoiSchema, JoiSchemaOptions, CREATE, UPDATE } from 'nestjs-joi';
import * as Joi from 'joi';
import { Contract } from '@root/contract/entities/contract.entity';

export type UserDocument = User & Document;

@Schema()
export class User {

  @Prop({
    //required: true,
    minlength: 1,
    maxlength: 50,
    trim: true,
  })
  firstName: string;

  @Prop({
    //required: false,
    minlength: 1,
    maxlength: 50,
    trim: true,
  })
  lastName: string;

  @Prop()
  clientManagerId: string;

  @Prop()
  clientManagerEmail: string;

  @Prop({
    required: true,
    enum: ['admin', 'clientManager', 'clientSales', 'user'],
    default: 'user',
    minlength: 3,
    maxlength: 50,
    trim: true,
  })
  type: string;

  @Prop({
    required: false,
    minlength: 3,
    maxlength: 255,
    trim: true,
  })
  companyLogo: string;

  @Prop({
    required: false,
    minlength: 1,
    maxlength: 50,
    trim: true,
  })
  companyName: string;

  @Prop({
    required: false,
    trim: true,
  })
  companyInitial: string;

  @Prop({
    unique: true,
    required: true,
    minlength: 3,
    maxlength: 255,
    trim: true,
  })
  email: string;

  @Prop({
    minlength: 3,
    maxlength: 50,
    trim: true,
  })
  phone: string;

  @Prop({
    //required: true,
    minlength: 6,
    maxlength: 100,
    trim: true,
  })
  password: string;

  @Prop({
    default: 0,
  })
  onboardingFee: number;

  @Prop({ type: Address })
  address: Address;

  @Prop({
    required: false,
    minlength: 3,
    maxlength: 50,
    trim: true,
  })
  startDate: string;

  @Prop({
    required: false,
    trim: true,
  })
  description: string;

  @Prop({
    default: false,
  })
  paymentStatus: boolean;

  @Prop({
    default: 0,
  })
  allowDiscount: number;

  @Prop({
    default: 0,
  })
  profit: number;

  @Prop({
    default: 0,
  })
  tax: number;

  @Prop({
    default: Date.now,
  })
  created_at: Date;

  @Prop({
    default: Date.now,
  })
  updated_at: Date;

  @Prop({
    default: true,
    minlength: 3,
    maxlength: 4,
  })
  enable: boolean;

  @Prop({
    default: false,
    minlength: 3,
    maxlength: 4,
  })
  deleted: boolean;

  @Prop({
    default: null,
  })
  customerStripeId: string;

  @Prop()
  categories: [
    {
      category: {
        type: mongoose.Schema.Types.ObjectId;
        ref: 'Category';
      };
      active: {
        type: Boolean;
        default: true;
      };
      quantity: {
        type: Number;
        default: 0;
      };
      sub_Categories: [
        {
          sub_category: {
            type: mongoose.Schema.Types.ObjectId;
            ref: 'Category';
          };
          active: {
            type: Boolean;
            default: true;
          };
          quantity: {
            type: Number;
            default: 0;
          };
          sub_sub_Categories: [
            {
              sub_sub_category: {
                type: mongoose.Schema.Types.ObjectId;
                ref: 'Category';
              };
              active: {
                type: Boolean;
                default: true;
              };
              quantity: {
                type: Number;
                default: 0;
              };
              sub_sub_sub_Categories: [
                {
                  sub_sub_sub_category: {
                    type: mongoose.Schema.Types.ObjectId;
                    ref: 'Category';
                  };
                  active: {
                    type: Boolean;
                    default: true;
                  };
                  quantity: {
                    type: Number;
                    default: 0;
                  };
                },
              ];
            },
          ];
        },
      ];
    },
  ];

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
      },
    ],
  })
  clientManager: User[];

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
      },
    ],
  })
  salesManager: User[];

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HomeOwner',
      },
    ],
  })
  homeOwners;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Template',
      },
    ],
  })
  templates: Template[];

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proposal',
      },
    ],
  })
  proposal: Proposal[];

  @Prop()
  proposalCount: number;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contract',
      },
    ],
  })
  contract: Contract[];
}

export const UserSchema = SchemaFactory.createForClass(User);
