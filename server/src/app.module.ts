import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionsModule } from './questions/questions.module';

const db_name = 'projectQ'
const db = (process.env.NODE_ENV === 'production') ? `mongodb://gsaulnier:ih0gQlM92m9Px2YY@cluster0-shard-00-00-nmwha.mongodb.net:27017,cluster0-shard-00-01-nmwha.mongodb.net:27017,cluster0-shard-00-02-nmwha.mongodb.net:27017/${db_name}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority` : `mongodb://localhost:27017/${db_name}`;

@Module({
  imports: [
    MongooseModule.forRoot(db),
    QuestionsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

