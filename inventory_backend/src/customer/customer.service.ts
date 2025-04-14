import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { UpdateCustomerDTO } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDTO: CreateCustomerDTO): Promise<Customer> {
    const newCustomer = this.customerRepository.create(createCustomerDTO);
    return await this.customerRepository.save(newCustomer);
  }

  async findAll(): Promise<Customer[]> {
    return await this.customerRepository.find();
  }

  async findOne(id: number): Promise<Customer | undefined> {
    return await this.customerRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateCustomerDTO: UpdateCustomerDTO,
  ): Promise<Customer> {
    const existingCustomer = await this.customerRepository.findOne({
      where: { id },
    });

    if (!existingCustomer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    Object.assign(existingCustomer, updateCustomerDTO);

    return await this.customerRepository.save(existingCustomer);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.customerRepository.delete(id);
    return result.affected > 0;
  }
}
