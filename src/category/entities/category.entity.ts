import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
    @Prop({ required: true })
    name: string;

    @Prop({
        default: '',
        trim: true,
    })
    details: string;

    @Prop({
        default: 0,
    })
    price: number;

    @Prop({
        default: 0,
    })
    previousPrice: number;

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
    })
    enable: boolean;

    @Prop({
        default: true,
    })
    parent: boolean;

    @Prop({
        default: false,
    })
    deleted: boolean;

    @Prop({
        default: true,
    })
    active: boolean;

    @Prop({
        default: '',
        trim: true,
    })
    image: string;

    @Prop({
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Category',
            },
        ],
    })
    subCategory: Category[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
