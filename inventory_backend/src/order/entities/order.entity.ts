import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Transaction } from '../../transaction/entities/transaction.entity';
import { Factory } from '../../factory/entities/factory.entity';
import { OrderDetail } from '../../order-detail/entities/order-detail.entity';
import { Customer } from '../../customer/entities/customer.entity';
import { Employee } from '../../employee/entities/employee.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  orderId: number;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @ManyToOne(() => Employee, (employee) => employee.orders)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @ManyToOne(() => Factory, (factory) => factory.orders)
  @JoinColumn({ name: 'factory_id' })
  factory: Factory;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order, {
    cascade: true,
  })
  orderDetails: OrderDetail[];

  @OneToOne(() => Transaction, (transaction) => transaction.order, {
    cascade: true,
  })
  transaction: Transaction;

  @Column()
  orderDate: Date;

  @Column()
  totalAmount: number;

  @Column()
  paymentMethod: string;

  @Column()
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
}
