import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { EmployeeModule } from '../employee/employee.module';
import { OrderDetailModule } from '../order-detail/order-detail.module';
import {CustomerModule} from "../customer/customer.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    EmployeeModule,
    OrderDetailModule,
    CustomerModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [TypeOrmModule.forFeature([Order])],
})
export class OrderModule {}
