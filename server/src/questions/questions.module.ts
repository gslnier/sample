import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { QuestionSchema } from './schemas/questions.schemas'
@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'questions', schema: QuestionSchema }])
    ],
    providers: [QuestionsService],
    controllers: [QuestionsController]
})
export class QuestionsModule {}
