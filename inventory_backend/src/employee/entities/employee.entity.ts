import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Transaction } from '../../transaction/entities/transaction.entity';
import { Factory } from '../../factory/entities/factory.entity';
import { Order } from '../../order/entities/order.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  position: string;

  @Column()
  hireDate: Date;

  @OneToOne(() => User, (user) => user.employee, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Factory, (factory) => factory.employees)
  @JoinColumn({ name: 'factory_id' })
  factory: Factory;

  @OneToMany(() => Transaction, (transaction) => transaction.employee)
  transactions: Transaction[];

  @OneToMany(() => Order, (order) => order.employee)
  orders: Order[];
}
