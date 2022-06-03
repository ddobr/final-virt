import { IsNumber } from "class-validator";

export class DeleteArticleDto {
    @IsNumber()
    id: number;
}