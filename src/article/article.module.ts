import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleController } from './article.controller';
import { Article } from './article.entity';
import { HttpModule } from '@nestjs/axios';
import { ArticleService } from './article.service';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forFeature([Article]),
        HttpModule.register({
            baseURL: '',
        }),
    ],
    providers: [ArticleService],
    controllers: [ArticleController]
})
export class UsersModule {}
