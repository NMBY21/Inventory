import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Item } from '../../item/entities/item.entity';
import { Factory } from '../../factory/entities/factory.entity';
import { Supplier } from '../../supplier/entities/supplier.entity';

@Entity('inventory')
export class Inventory {
  @PrimaryGeneratedColumn()
  inventory_id: number;

  @OneToOne(() => Item, (item) => item.inventory)
  @JoinColumn({ name: 'item_id' })
  item: Item;

  @Column()
  quantity_in_stock: number;

  @Column()
  reorder_level: number;

  @Column()
  last_restock_date: Date;

  @ManyToOne(() => Factory, (factory) => factory.inventory)
  @JoinColumn({ name: 'factory_id' })
  factory: Factory;

  @OneToOne(() => Supplier, (supplier) => supplier.inventory)
  @JoinColumn({ name: 'supplier_id' })
  supplier: Supplier;
}
