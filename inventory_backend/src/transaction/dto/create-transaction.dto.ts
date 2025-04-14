import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Order } from '../../order/entities/order.entity';
// import { Customer } from '../../customer/entities/customer.entity';

export class CreateTransactionDto {
  // readonly customer: Customer;

  @IsNotEmpty({ message: 'Order cannot be empty' })
  readonly order: Order;

  @IsNotEmpty({ message: 'Total amount cannot be empty' })
  @IsNumber({}, { message: 'Total amount must be a number' })
  @Min(0.01, { message: 'Total amount must be greater than 0' })
  readonly total_amount: number;

  @IsNotEmpty()
  readonly transactionTo: string;
}
