import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Item } from '../../item/entities/item.entity';
import { Order } from '../../order/entities/order.entity';

export class CreateOrderDetailDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1, { message: 'Quantity must be at least 1' })
  readonly quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0.01, { message: 'Unit price must be greater than 0' })
  readonly unitPrice: number;

  @IsNumber()
  @Min(0, { message: 'Discount cannot be negative' })
  readonly discount: number;

  @IsNotEmpty()
  readonly item: Item;

  @IsNotEmpty()
  readonly order: Order;
}
