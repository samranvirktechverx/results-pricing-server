import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TemplateDocument = Template & Document;

@Schema()
export class Template {
    @Prop({
        required: true,
    })
    templateName: string;

    @Prop({
        required: false,
        minLength: 1,
        maxLength: 50,
        trim: true,
    })
    lastUsed: string;

    @Prop()
    poolPerimeter: number;

    @Prop()
    poolSqft: number;

    @Prop()
    depth1: number;

    @Prop()
    depth2: number;

    @Prop()
    depth3: number;

    @Prop()
    spaPerimeter: number;

    @Prop()
    spaRaisedAbovePool: number;

    @Prop()
    spaSqft: number;

    @Prop()
    spaDepth: number;

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
        default: false,
    })
    deleted: boolean;

    @Prop()
    clientManagerId: string;

    @Prop()
    creatorId: string;

    @Prop({
        required: false,
    })
    totalRetail: number;

    @Prop({
        required: false,
    })
    discount: number;

    @Prop({
        default: true,
    })
    discountApproved: boolean;

    @Prop()
    notes: [];

    @Prop()
    categories: [];
}

export const TemplateSchema = SchemaFactory.createForClass(Template);
