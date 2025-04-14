import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from './entities/supplier.entity';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
  ) {}

  async getAllSuppliers(): Promise<Supplier[]> {
    return await this.supplierRepository.find();
  }

  async getSupplierById(id: number): Promise<Supplier> {
    const supplier = await this.supplierRepository.findOne({
      where: { supplier_id: id },
    });

    if (!supplier) {
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    }

    return supplier;
  }

  async createSupplier(
    createSupplierDto: CreateSupplierDto,
  ): Promise<Supplier> {
    const { address, ...supplierData } = createSupplierDto;

    const newSupplier = this.supplierRepository.create(supplierData);
    newSupplier.address = address;

    return await this.supplierRepository.save(newSupplier);
  }

  async updateSupplier(
    id: number,
    updateSupplierDto: UpdateSupplierDto,
  ): Promise<Supplier> {
    const { address, ...supplierData } = updateSupplierDto;

    const existingSupplier = await this.getSupplierById(id);
    Object.assign(existingSupplier, supplierData);
    existingSupplier.address = address;

    return await this.supplierRepository.save(existingSupplier);
  }

  async deleteSupplier(id: number): Promise<boolean> {
    const supplier = await this.supplierRepository.findOne({
      where: { supplier_id: id },
      relations: ['address'],
    });

    if (!supplier) {
      return false;
    }

    const deleteResult = await this.supplierRepository.delete(id);

    if (deleteResult.affected > 0) {
      if (supplier.address) {
      }
      return true;
    }

    return false;
  }
}
