import { IsNotEmpty, IsString, IsNumber, Min, Max, IsIn } from 'class-validator';
import {Category} from "../../category/entities/category.entity";

export class CreateItemDto {
  @IsNotEmpty()
  @IsString()
  readonly item_name: string;

  @IsNotEmpty()
  @IsIn(['product', 'raw material'], { message: 'Invalid item type' })
  readonly item_type: 'product' | 'raw material';

  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0.01, { message: 'Price must be greater than 0' })
  readonly price: number;

  @IsNumber()
  @Min(0, { message: 'Discount cannot be negative' })
  @Max(100, { message: 'Discount cannot be greater than 100' })
  readonly discount: number;

  @IsNotEmpty()
  category: Category;
}
