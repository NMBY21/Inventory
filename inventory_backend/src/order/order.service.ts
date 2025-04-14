import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderDetail } from '../order-detail/entities/order-detail.entity';
import {Customer} from "../customer/entities/customer.entity";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async getAllOrders(): Promise<Order[]> {
    return await this.orderRepository.find({
      relations: {
        customer: true,
      }
    });
  }

  async getOrderById(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { orderId: id },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const {
      totalAmount,
      paymentMethod,
      status,
      orderDetails,
      transaction,
      customer,
    } = createOrderDto;

    // Ensure status is one of the allowed values
    if (!['pending', 'processing', 'completed', 'cancelled'].includes(status)) {
      throw new BadRequestException(`Invalid status: ${status}`);
    }

    let newCustomer: Customer;
    if (customer.id === 0) {
      newCustomer = await this.customerRepository.save(customer);
    } else {
      newCustomer = customer;
    }

    const newOrder = new Order();
    newOrder.totalAmount = totalAmount;
    newOrder.paymentMethod = paymentMethod;
    newOrder.status = status as any;
    newOrder.transaction = transaction;
    newOrder.customer = newCustomer;
    newOrder.orderDate = new Date();

    const savedOrder = await this.orderRepository.save(newOrder);

    const orderDetailEntities = orderDetails.map((detail) => {
      return this.orderDetailRepository.create({
        ...detail,
        order: savedOrder,
      });
    });

    await this.orderDetailRepository.save(orderDetailEntities);

    return savedOrder;
  }

  async updateOrder(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    const existingOrder = await this.getOrderById(id);
    Object.assign(existingOrder, updateOrderDto);
    return await this.orderRepository.save(existingOrder);
  }

  async deleteOrder(id: number): Promise<boolean> {
    const result = await this.orderRepository.delete(id);
    return result.affected > 0;
  }
}
