import { IsNotEmpty, IsString } from 'class-validator';

export class CreateArticleDto {
    @IsString()
    @IsNotEmpty({
        message: 'add \'text\' to your dto'
    })
    text: string;
}