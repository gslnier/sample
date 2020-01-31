import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Question } from './interfaces/questions.interface';
import { CreateQuestionDTO } from "./dto/questions.dto";

import { Pictures } from '../mock/pictures'

@Injectable()
export class QuestionsService {
    constructor(@InjectModel('questions') private readonly questionModel: Model<Question>) { }

    async delete(): Promise<any> {
        return this.questionModel.deleteMany().exec();
    }

    async count() : Promise<any> {
        return this.questionModel.countDocuments().exec()
    }

    async insert(): Promise<Question[]> {

        const questions = Pictures.map((item, index) => new this.questionModel({
            _id: (index + 1),
            picture: item,
            like: Math.round(Math.random() * 100),
            dislike: Math.round(Math.random() * 100),
        }));

        await this.delete();

        return this.questionModel.insertMany(questions);
    }

    async create(createQuestionDto: CreateQuestionDTO): Promise<Question> {
        const createdCat = new this.questionModel(createQuestionDto);
        return createdCat.save();
    }

    async getAllQuestions(page :number): Promise<Question[]> {
        return this.questionModel.find().limit(20).skip((page - 1) * 20).sort([['like', 'descending']]).exec();
    }

    async getRandomQuestion(): Promise<Question[]> {
        const nbItems = await this.count();
        return this.questionModel.findOne().skip(Math.round(Math.random() * nbItems)).exec();
    }

    async likeQuestion(questionID): Promise<Question> {
        const updatedQuestion = await this.questionModel
            .updateOne({ _id: questionID, like: { $gte: 0 } } , { $inc: { like: 1 } });
        return updatedQuestion;
    }

    async dislikeQuestion(questionID): Promise<Question> {
        const updatedQuestion = await this.questionModel
            .updateOne({ _id: questionID, dislike: { $gte: 0 } } , { $inc: { dislike: 1 } });

        return updatedQuestion;
    }

}
