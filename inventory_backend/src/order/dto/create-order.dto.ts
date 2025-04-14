import { IsNotEmpty, IsNumber, IsString, IsIn } from 'class-validator';
import { OrderDetail } from '../../order-detail/entities/order-detail.entity';
import { Transaction } from '../../transaction/entities/transaction.entity';
import { Customer } from '../../customer/entities/customer.entity';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  readonly totalAmount: number;

  @IsNotEmpty()
  @IsString()
  readonly paymentMethod: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['pending', 'processing', 'completed', 'cancelled'])
  readonly status: string;

  @IsNotEmpty()
  orderDetails: OrderDetail[];

  transaction: Transaction;

  customer: Customer;
}
