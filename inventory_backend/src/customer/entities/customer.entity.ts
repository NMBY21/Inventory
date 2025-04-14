import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Order } from '../../order/entities/order.entity';
import { UserExperience } from '../../user-experience/entities/user-experience.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  contactNumber: string;

  // @OneToOne(() => Address, (address) => address.customer, { cascade: true })
  // @JoinColumn({ name: 'address_id' })
  // address: Address;

  // @OneToMany(() => Transaction, (transaction) => transaction.customer)
  // transactions: Transaction[];

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];

  @OneToOne(() => UserExperience, (userExperience) => userExperience.customer, {
    cascade: true,
  })
  userExperience: UserExperience;
}
