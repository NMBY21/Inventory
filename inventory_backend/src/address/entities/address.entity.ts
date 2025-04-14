import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Supplier } from '../../supplier/entities/supplier.entity';
import { Factory } from '../../factory/entities/factory.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  address_id: number;

  @Column()
  country: string;

  @Column()
  region: string;

  @Column()
  city: string;

  @Column()
  street: string;

  @Column()
  postal_code: string;

  @OneToOne(() => Supplier, (supplier) => supplier.address)
  supplier: Supplier;

  @OneToOne(() => Factory, (factory) => factory.address)
  factory: Factory;

  // @OneToOne(() => Customer, (customer) => customer.address)
  // customer: Customer;
}
