import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { CreateArticleDto } from './dto/req/create-article.dto';
import * as FormData from 'form-data';


@Injectable()
export class ArticleService {

    private _bucketEndpoint = 'https://storage.yandexcloud.net/some-bucket-123';

    @InjectRepository(Article)
    private _articleRepository: Repository<Article>;

    constructor(
        private _httpService: HttpService
    ) {

    }

    public findAll(): Promise<Article[]> {
        return this._articleRepository.find({
            order: {
                createdDate: 'DESC'
            }
        });
    }

    public async createArticle(dto: CreateArticleDto, img?:  Express.Multer.File): Promise<number> {
        // Создаем статью без картинки
        const insertResult = await this._articleRepository.insert(this._articleRepository.create(dto));
        const id: number = insertResult.identifiers[0].id;

        // Если передана картинка - отправляем ее в Object Storage. Ссылку на изображение записываем в imgSrc
        let imgSrc: string | null = null;
        if (img && img.mimetype.startsWith('image')) {
            const formData = new FormData();
            formData.append('key', `img${id}`);
            formData.append('file', (img as any).buffer);

            await lastValueFrom(this._httpService.post(this._bucketEndpoint, formData, { headers: { 'Content-Type': 'multipart/form-data' }}));
            
            imgSrc = `${this._bucketEndpoint}/img${id}`;
        }


        if (imgSrc !== null) {
            await this._articleRepository.update({
                id: insertResult.identifiers[0].id,
            }, {
                imgSrc: imgSrc
            });
        }


        return insertResult.identifiers[0].id
    }

    public findOne(id: string): Promise<Article | null> {
        return this._articleRepository.findOne({
            where: {
                id: Number.parseInt(id)
            }
        });
    }

    public async remove(id: string): Promise<void> {
        const imgSrc: string | null = (await this._articleRepository.findOne({
            where: {
                id: Number.parseInt(id)
            }
        })).imgSrc;

        if (imgSrc !== null) {
            const objName = imgSrc.split('/')[4];

            this._httpService.delete(`${this._bucketEndpoint}/${objName}`).subscribe();
        }

        await this._articleRepository.delete(id);
    }

    public async takeN(take: number, skip: number): Promise<Article[]> {
        return this._articleRepository.find({
            take: take,
            skip: skip 
        })
    }
}
