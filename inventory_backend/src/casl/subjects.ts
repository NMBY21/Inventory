/* eslint-disable prettier/prettier */
import { InferSubjects } from '@casl/ability';
import { Category } from 'src/category/entities/category.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { Employee } from 'src/employee/entities/employee.entity';
import { Factory } from 'src/factory/entities/factory.entity';
import { Inventory } from 'src/inventory/entities/inventory.entity';
import { Item } from 'src/item/entities/item.entity';
import { OrderDetail } from 'src/order-detail/entities/order-detail.entity';
import { Order } from 'src/order/entities/order.entity';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { UserExperience } from 'src/user-experience/entities/user-experience.entity';
import { User } from 'src/user/entities/user.entity';
import { Transaction } from 'typeorm';

export type Subjects =
  | InferSubjects<
      | typeof User
      | typeof Category
      | typeof Customer
      | typeof Employee
      | typeof Factory
      | typeof Inventory
      | typeof Item
      | typeof Order
      | typeof OrderDetail
      | typeof Supplier
      | typeof Transaction
      | typeof UserExperience
    >
  | 'all';
