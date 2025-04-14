import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async create(@Body() createAddressDto: CreateAddressDto): Promise<Address> {
    try {
      return await this.addressService.create(createAddressDto);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Address already exists');
      } else {
        throw new InternalServerErrorException('Failed to create address');
      }
    }
  }

  @Get()
  async findAll(): Promise<Address[]> {
    try {
      return await this.addressService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve addresses');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Address | undefined> {
    try {
      return await this.addressService.findOne(+id);
    } catch (error) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    try {
      return await this.addressService.update(+id, updateAddressDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Failed to update address');
      }
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<boolean> {
    try {
      return await this.addressService.remove(+id);
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete address');
    }
  }
}
