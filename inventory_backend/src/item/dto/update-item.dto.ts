import { PartialType } from '@nestjs/mapped-types';
import { CreateItemDto } from './create-item.dto';
import {IsIn, IsNotEmpty, IsNumber, IsString, Max, Min} from "class-validator";

export class UpdateItemDto extends PartialType(CreateItemDto) {
    @IsString()
    readonly item_name: string;

    @IsIn(['product', 'raw material'], { message: 'Invalid item type' })
    readonly item_type: 'product' | 'raw material';

    @IsString()
    readonly description: string;

    @IsNumber()
    @Min(0.01, { message: 'Price must be greater than 0' })
    readonly price: number;

    @IsNumber()
    @Min(0, { message: 'Discount cannot be negative' })
    @Max(100, { message: 'Discount cannot be greater than 100' })
    readonly discount: number;
}
