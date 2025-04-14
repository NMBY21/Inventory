import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { IsNotEmpty, MaxLength } from "class-validator";

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    @IsNotEmpty()
    @MaxLength(50)
    readonly category_name: string;

    @MaxLength(255)
    readonly description: string;
}
