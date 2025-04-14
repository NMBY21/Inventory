import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetail } from './entities/order-detail.entity';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { Item } from '../item/entities/item.entity';
import { UserExperience } from '../user-experience/entities/user-experience.entity';
import { Order } from '../order/entities/order.entity';

@Injectable()
export class OrderDetailService {
  constructor(
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
  ) {}

  async getAllOrderDetails(): Promise<OrderDetail[]> {
    return await this.orderDetailRepository.find();
  }

  async getOrderDetailById(id: number): Promise<OrderDetail> {
    const orderDetail = await this.orderDetailRepository.findOne({
      where: { orderDetailId: id },
    });

    if (!orderDetail) {
      throw new NotFoundException(`OrderDetail with ID ${id} not found`);
    }

    return orderDetail;
  }

  async getOrderDetailByOrder(orderId: number) {
    return this.orderDetailRepository.find({
      where: {
        order: { orderId },
      },
      relations: {
        item: true,
      },
    });
  }

  async createOrderDetail(
    createOrderDetailDto: CreateOrderDetailDto,
  ): Promise<OrderDetail> {
    const newOrderDetail =
      this.orderDetailRepository.create(createOrderDetailDto);
    return await this.orderDetailRepository.save(newOrderDetail);
  }

  async orderDetail(orderDetails: {
    unitPrice: number;
    item: Item;
    quantity: number;
    discount: number;
    userExperience: UserExperience;
    orderDetailId: number;
    order: Order;
  }) {
    return this.orderDetailRepository.save(orderDetails);
  }

  async updateOrderDetail(
    id: number,
    updateOrderDetailDto: UpdateOrderDetailDto,
  ): Promise<OrderDetail> {
    const existingOrderDetail = await this.getOrderDetailById(id);
    Object.assign(existingOrderDetail, updateOrderDetailDto);
    return await this.orderDetailRepository.save(existingOrderDetail);
  }

  async deleteOrderDetail(id: number): Promise<boolean> {
    const result = await this.orderDetailRepository.delete(id);
    return result.affected > 0;
  }
}
