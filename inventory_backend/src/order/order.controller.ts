import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CheckAbilities } from '../casl/casl.decorator';
import { Action } from '../auth/enums/action.enum';
import {Order} from "./entities/order.entity";

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @CheckAbilities({ action: Action.Read, subject: Order })
  async getAllOrders() {
    try {
      return await this.orderService.getAllOrders();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string) {
    try {
      const order = await this.orderService.getOrderById(+id);
      if (!order) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }
      return order;
    } catch (error) {
      console.error('Error in getOrderById:', error);
      throw error;
    }
  }

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    try {
      console.log(createOrderDto);
      return await this.orderService.createOrder(createOrderDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Patch(':id')
  async updateOrder(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    try {
      const updatedOrder = await this.orderService.updateOrder(
        +id,
        updateOrderDto,
      );
      if (!updatedOrder) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }
      return updatedOrder;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string) {
    try {
      const result = await this.orderService.deleteOrder(+id);
      if (!result) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }
      return { data: { affectedRows: result }, success: true };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
