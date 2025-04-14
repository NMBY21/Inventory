import { IsNotEmpty, IsNumber, Min, IsDate } from 'class-validator';
import { Factory } from '../../factory/entities/factory.entity';
import { Item } from 'src/item/entities/item.entity';

export class CreateInventoryDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  readonly quantity_in_stock: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  readonly reorder_level: number;

  @IsNotEmpty()
  @IsDate()
  readonly last_restock_date: Date;

  @IsNotEmpty()
  factory: Factory;

  @IsNotEmpty()
  item: Item;
}
