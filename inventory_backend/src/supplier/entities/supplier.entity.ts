import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Address } from '../../address/entities/address.entity';
import { Inventory } from '../../inventory/entities/inventory.entity';

@Entity('supplier')
export class Supplier {
  @PrimaryGeneratedColumn()
  supplier_id: number;

  @OneToOne(() => Address, (address) => address.supplier, { cascade: true })
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @Column()
  supplier_name: string;

  @Column()
  contact_number: string;

  @Column()
  email: string;

  @OneToOne(() => Inventory, (Inventory) => Inventory.supplier)
  inventory: Inventory;
}
