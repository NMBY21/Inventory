import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { OrderDetail } from '../../order-detail/entities/order-detail.entity';
import { Customer } from '../../customer/entities/customer.entity';

@Entity('user_experience')
export class UserExperience {
  @PrimaryGeneratedColumn()
  experienceId: number;

  @Column()
  experienceText: string;

  @Column()
  rating: number;

  @Column()
  feedbackDate: Date;

  @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.userExperience)
  @JoinColumn({ name: 'orderDetail_id' })
  orderDetail: OrderDetail;

  @OneToOne(() => Customer, (Customer) => Customer.userExperience)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;
}
