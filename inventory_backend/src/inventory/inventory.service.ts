import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from './entities/inventory.entity';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
  ) {}

  async createInventory(
    createInventoryDto: CreateInventoryDto,
  ): Promise<Inventory> {
    const newInventory = this.inventoryRepository.create(createInventoryDto);
    return await this.inventoryRepository.save(newInventory);
  }

  async getAllInventory(): Promise<Inventory[]> {
    return await this.inventoryRepository.find({
      relations: {
        supplier: true,
        item: true,
      },
    });
  }

  async getInventoryById(id: number): Promise<Inventory> {
    const inventory = await this.inventoryRepository.findOne({
      where: { inventory_id: id },
    });

    if (!inventory) {
      throw new NotFoundException(`Inventory with ID ${id} not found`);
    }

    return inventory;
  }

  async updateInventory(
    id: number,
    updateInventoryDto: UpdateInventoryDto,
  ): Promise<Inventory> {
    const existingInventory = await this.getInventoryById(id);
    Object.assign(existingInventory, updateInventoryDto);
    return await this.inventoryRepository.save(existingInventory);
  }

  async deleteInventory(id: number): Promise<boolean> {
    const result = await this.inventoryRepository.delete(id);
    return result.affected > 0;
  }
}
