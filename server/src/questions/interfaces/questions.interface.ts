import { Document } from 'mongoose';

export interface Question extends Document {
    readonly _id: string;
    readonly picture: string;
    readonly like: number;
    readonly dislike: number;
}
