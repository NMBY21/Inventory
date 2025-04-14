import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { OrderDetail } from '../../order-detail/entities/order-detail.entity';
import { Inventory } from '../../inventory/entities/inventory.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  item_id: number;

  @ManyToOne(() => Category, (category) => category.items)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => OrderDetail, (orderDetail) => orderDetail.item)
  orderDetail: OrderDetail;

  @OneToOne(() => Inventory, (Inventory) => Inventory.item, { cascade: true })
  inventory: Inventory;

  @Column()
  item_name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  discount: number;

  @Column({ type: 'enum', enum: ['product', 'raw material'] })
  item_type: 'product' | 'raw material';
}
