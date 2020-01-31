import * as mongoose from 'mongoose';

export const QuestionSchema = new mongoose.Schema({
    _id: String,
    picture: String,
    like: Number,
    dislike: Number,
});
