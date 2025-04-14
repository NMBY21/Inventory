import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Order } from '../../order/entities/order.entity';
import { Employee } from '../../employee/entities/employee.entity';

@Entity('transaction')
export class Transaction {
  @PrimaryGeneratedColumn()
  transaction_id: number;

  @OneToOne(() => Order, (order) => order.transaction)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  // @ManyToOne(() => Customer, (customer) => customer.transactions)
  // @JoinColumn({ name: 'customer_id' })
  // customer: Customer;

  @ManyToOne(() => Employee, (employee) => employee.transactions)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column()
  transaction_date: Date;

  @Column({ default: 'Credit' })
  type: 'Credit' | 'Debit';

  @Column({ nullable: true })
  transactionTo: string;

  @Column()
  total_amount: number;
}
