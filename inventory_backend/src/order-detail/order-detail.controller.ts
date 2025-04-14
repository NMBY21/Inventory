import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { OrderDetailService } from './order-detail.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';

//todo: does order detail need a controller?
// are we gonna directly make a request for order detail with out the order?
@Controller('order-detail')
export class OrderDetailController {
  constructor(private readonly orderDetailService: OrderDetailService) {}

  @Get()
  async getAllOrderDetails() {
    try {
      return await this.orderDetailService.getAllOrderDetails();
    } catch (error) {
      throw new HttpException(
        'Failed to fetch order details',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getOrderDetailById(@Param('id') id: string) {
    try {
      return await this.orderDetailService.getOrderDetailById(+id);
    } catch (error) {
      throw new HttpException('Order detail not found', HttpStatus.NOT_FOUND);
    }
  }

  @Get('order/:id')
  async getOrderDetailByOrder(@Param('id') id: string) {
    try {
      return await this.orderDetailService.getOrderDetailByOrder(+id);
    } catch (error) {
      throw new HttpException('Order detail not found', HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  async createOrderDetail(@Body() createOrderDetailDto: CreateOrderDetailDto) {
    try {
      return await this.orderDetailService.createOrderDetail(
        createOrderDetailDto,
      );
    } catch (error) {
      throw new HttpException(
        'Failed to create order detail',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async updateOrderDetail(
    @Param('id') id: string,
    @Body() updateOrderDetailDto: UpdateOrderDetailDto,
  ) {
    try {
      return await this.orderDetailService.updateOrderDetail(
        +id,
        updateOrderDetailDto,
      );
    } catch (error) {
      throw new HttpException(
        'Failed to update order detail',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async deleteOrderDetail(@Param('id') id: string) {
    try {
      return await this.orderDetailService.deleteOrderDetail(+id);
    } catch (error) {
      throw new HttpException(
        'Failed to delete order detail',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
