import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from '../../order/entities/order.entity';
import { Employee } from '../../employee/entities/employee.entity';
import { Address } from '../../address/entities/address.entity';
import { Inventory } from '../../inventory/entities/inventory.entity';

@Entity('factories')
export class Factory {
  @PrimaryGeneratedColumn()
  factoryId: number;

  @Column()
  factoryName: string;

  @OneToMany(() => Order, (order) => order.factory)
  orders: Order[];

  @OneToMany(() => Employee, (employee) => employee.factory, { cascade: true })
  employees: Employee[];

  @OneToMany(() => Inventory, (inventory) => inventory.factory, {
    cascade: true,
  })
  inventory: Inventory[];

  @OneToOne(() => Address, (address) => address.factory, { cascade: true })
  @JoinColumn({ name: 'address_id' })
  address: Address;
}
