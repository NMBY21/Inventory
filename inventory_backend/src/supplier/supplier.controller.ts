import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Get()
  async getAllSuppliers() {
    try {
      return await this.supplierService.getAllSuppliers();
    } catch (error) {
      throw new HttpException('Internal Server Error', 500);
    }
  }

  @Get(':id')
  async getSupplierById(@Param('id') id: string) {
    try {
      return await this.supplierService.getSupplierById(+id);
    } catch (error) {
      throw new HttpException('Supplier not found', 404);
    }
  }

  @Post()
  async createSupplier(@Body() createSupplierDto: CreateSupplierDto) {
    try {
      return await this.supplierService.createSupplier(createSupplierDto);
    } catch (error) {
      throw new HttpException('Error creating supplier', 500);
    }
  }

  @Patch(':id')
  async updateSupplier(
    @Param('id') id: string,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ) {
    try {
      return await this.supplierService.updateSupplier(+id, updateSupplierDto);
    } catch (error) {
      throw new HttpException('Error updating supplier', 500);
    }
  }

  @Delete(':id')
  async deleteSupplier(@Param('id') id: string) {
    try {
      return await this.supplierService.deleteSupplier(+id);
    } catch (error) {
      throw new HttpException('Error deleting supplier', 500);
    }
  }
}
