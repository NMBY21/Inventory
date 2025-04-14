import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}
  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    const newAddress = this.addressRepository.create(createAddressDto);
    return await this.addressRepository.save(newAddress);
  }

  async findAll(): Promise<Address[]> {
    return await this.addressRepository.find();
  }

  async findOne(id: number): Promise<Address | undefined> {
    return await this.addressRepository.findOne({
      where: { address_id: id },
    });
  }

  async update(
    id: number,
    updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    const existingAddress = await this.addressRepository.findOne({
      where: { address_id: id },
    });

    if (!existingAddress) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }

    Object.assign(existingAddress, updateAddressDto);

    return await this.addressRepository.save(existingAddress);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.addressRepository.delete(id);
    return result.affected > 0;
  }
}
