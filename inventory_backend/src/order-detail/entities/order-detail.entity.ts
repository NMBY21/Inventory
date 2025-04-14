import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Item } from '../../item/entities/item.entity';
import { Order } from '../../order/entities/order.entity';
import { UserExperience } from '../../user-experience/entities/user-experience.entity';

@Entity('order_detail')
export class OrderDetail {
  @PrimaryGeneratedColumn()
  orderDetailId: number;

  @ManyToOne(() => Item, (item) => item.orderDetail)
  @JoinColumn({ name: 'item_id' })
  item: Item;

  @ManyToOne(() => Order, (order) => order.orderDetails)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @OneToOne(
    () => UserExperience,
    (userExperience) => userExperience.orderDetail,
  )
  userExperience: UserExperience;

  @Column()
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unitPrice: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  discount: number;
}
