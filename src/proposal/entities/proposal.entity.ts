import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Template } from 'src/template/entities/template.entity';
import { User } from 'src/user/entities/user.entity';

export type ProposalDocument = Proposal & Document;

@Schema()
export class Proposal {
    @Prop({
        required: true,
        unique: true,
    })
    proposalName: string;

    @Prop()
    poolPerimeter: number;

    @Prop({
        required: true,
        enum: ['active', 'pendingOverride', 'sent', 'lost', 'sold'],
        default: 'active',
        minlength: 3,
        maxlength: 50,
        trim: true,
    })
    status: string;

    @Prop()
    clientManagerId: string;

    @Prop()
    creatorId: string;

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

    @Prop()
    attachements: string[];

    @Prop()
    notes: string;

    @Prop({
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Template',
            },
        ],
    })
    templateId: Template[];

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
    enabled: boolean;

    @Prop({
        default: false,
    })
    deleted: boolean;

    @Prop({
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'CustomField',
            },
        ],
    })
    customFields;

    @Prop({
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Users',
            },
        ],
    })
    user: User[];

    @Prop({
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'HomeOwner',
            },
        ],
    })
    homeOwner;

    @Prop()
    categories: [];

    @Prop({
        required: false,
    })
    totalRetail: number;

    @Prop({
        required: false,
    })
    discount: number;

    @Prop({
        required: false,
        default: 0,
    })
    downPayment: number;

    @Prop({
        default: true,
    })
    discountApproved: boolean;

    @Prop({
        default: 0,
    })
    totalPrice: number;
}

export const ProposalSchema = SchemaFactory.createForClass(Proposal);
