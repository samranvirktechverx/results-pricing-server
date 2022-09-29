import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Proposal } from 'src/proposal/entities/proposal.entity';
import { User } from 'src/user/entities/user.entity';

export type ContractDocument = Contract & Document;

@Schema()
export class Contract {
    @Prop({
        default: Date.now,
    })
    created_at: Date;

    @Prop({
        default: Date.now,
    })
    updated_at: Date;

    @Prop()
    clientManagerId: string;

    @Prop()
    creatorId: string;

    @Prop({
        required: true,
        enum: ['sent', 'lost', 'sold'],
        default: 'sent',
        minlength: 3,
        maxlength: 50,
        trim: true,
    })
    status: string;

    @Prop({
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Users',
            },
        ],
    })
    creator: User[];

    @Prop({
        default: true,
    })
    enable: boolean;

    @Prop({
        deafult: false,
    })
    deleted: boolean;

    @Prop()
    ProposalName: string;

    @Prop({
        required: true,
    })
    totalPrice: number;

    @Prop({
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Proposal',
                required: true,
            },
        ],
    })
    proposal: Proposal[];

    @Prop({
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'HomeOwner',
                required: true,
            },
        ],
    })
    homeOwner;
}

export const ContractSchema = SchemaFactory.createForClass(Contract);
