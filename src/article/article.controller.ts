import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { Article } from './article.entity';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/req/create-article.dto';
import { DeleteArticleDto } from './dto/req/delete-article.dto';
import { TakeNArticlesDto } from './dto/req/take-n-articles.dto';

@Controller({ path: 'article' })
export class ArticleController {
    constructor(private readonly _articleService: ArticleService) {}

    @Get()
    public getArticles(): Promise<Article[]> {
        return this._articleService.findAll();
    }

    @Post()
    public postArticle(@Body() createPostDto: CreateArticleDto): Promise<number> {
        return this._articleService.createArticle(createPostDto);
    }

    @Get(':id')
    public async findById(@Param('id') id: string): Promise<Article> {
        const article = await this._articleService.findOne(id);

        if (article) {
            return article;
        }

        throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: 'No article with such id',
        }, HttpStatus.NOT_FOUND);
    }

    @Post('take')
    public takeN(@Body() takeN: TakeNArticlesDto): Promise<Article[]> {
        return this._articleService.takeN(takeN.take, takeN.skip);
    }

    @Delete()
    public deleteById(@Body() body: DeleteArticleDto): Promise<void> {
        return this._articleService.remove(body.id.toString());
    }
}
