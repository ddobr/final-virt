import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TakeNArticlesDto {
    @IsNumber()
    take: number;

    @IsNumber()
    skip: number;
}