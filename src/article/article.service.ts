import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { CreateArticleDto } from './dto/req/create-article.dto';

@Injectable()
export class ArticleService {
    @InjectRepository(Article)
    private _articleRepository: Repository<Article>;

    public findAll(): Promise<Article[]> {
        return this._articleRepository.find({
            order: {
                createdDate: 'DESC'
            }
        });
    }

    public async createArticle(dto: CreateArticleDto): Promise<number> {
        const insertResult = await this._articleRepository.insert(this._articleRepository.create(dto));

        return insertResult.identifiers[0].id
        //this._articleRepository
    }

    public findOne(id: string): Promise<Article | null> {
        return this._articleRepository.findOne({
            where: {
                id: Number.parseInt(id)
            }
        });
    }

    public async remove(id: string): Promise<void> {
        await this._articleRepository.delete(id);
    }

    public async takeN(take: number, skip: number): Promise<Article[]> {
        return this._articleRepository.find({
            take: take,
            skip: skip 
        })
    }
}
