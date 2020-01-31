import { Controller, Res, HttpStatus, Get, Body, Post, Param, NotFoundException, Put, Query } from '@nestjs/common';
import { QuestionsService } from "./questions.service";
import {CreateQuestionDTO} from "./dto/questions.dto";

@Controller('questions')
export class QuestionsController {

    constructor(private questionService: QuestionsService) { }

    @Post('/create')
    async addCustomer(@Res() res, @Body() createQuestionDTO: CreateQuestionDTO) {
        const question = await this.questionService.create(createQuestionDTO);
        return res.status(HttpStatus.OK).json({
            message: "Customer has been created successfully",
            question
        })
    }

    @Get('/insert')
    async insertData (@Res()res, @Body() createQuestionDTO: CreateQuestionDTO[]) {
        const questions = await this.questionService.insert();
        return res.status(HttpStatus.OK).json({
           message: 'Success insertion',
            questions
        });
    }

    @Get('/random')
    async randomData (@Res()res, @Body() createQuestionDTO: CreateQuestionDTO[]) {
        const question = await this.questionService.getRandomQuestion();
        return res.status(HttpStatus.OK).json(question);
    }

    // Retrieve questions list
    @Get('/list')
    async getAllQuestions(@Res() res, @Query('page') page = 1) {
        const questions = await this.questionService.getAllQuestions(Number(page));
        return res.status(HttpStatus.OK).json(questions);
    }

    @Put('/like/:questionID')
    async like(@Res() res, @Param('questionID') questionID) {
        const question = await this.questionService.likeQuestion(questionID);
        if (!question || (question as any).nModified === 0) throw new NotFoundException('question does not exist!');

        return res.status(HttpStatus.OK).json({
            message: `Question id => ${questionID} has been updated`,
            question
        });
    }

    @Put('/dislike/:questionID')
    async dislike(@Res() res, @Param('questionID') questionID) {
        const question = await this.questionService.dislikeQuestion(questionID);
        if (!question || (question as any).nModified === 0) throw new NotFoundException('question does not exist!');

        return res.status(HttpStatus.OK).json({
            message: `Question id => ${questionID} has been updated`,
            question
        });
    }

}
