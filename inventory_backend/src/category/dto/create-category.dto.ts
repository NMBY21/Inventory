import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @MaxLength(50)
  readonly category_name: string;

  @MaxLength(255)
  readonly description: string;
}
