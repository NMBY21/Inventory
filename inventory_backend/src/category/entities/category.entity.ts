import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Item } from '../../item/entities/item.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column()
  category_name: string;

  @Column()
  description: string;

  @OneToMany(() => Item, (item) => item.category, { cascade: true })
  items: Item[];
}
