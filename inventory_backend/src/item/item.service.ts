import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async getAllItems(): Promise<Item[]> {
    return await this.itemRepository.find({
      relations: [
        'category',
        // 'transactionDetails',
        // 'orderDetails',
        // 'inventory',
      ],
    });
  }

  async getItemById(id: number): Promise<Item> {
    const item = await this.itemRepository.findOne({
      where: { item_id: id },
      relations: ['category', 'supplier'],
    });

    if (!item) {
      throw new NotFoundException('Item with ID ${id} not found');
    }

    return item;
  }

  async createItem(createItemDto: CreateItemDto): Promise<Item> {
    const newItem = this.itemRepository.create(createItemDto);
    return await this.itemRepository.save(newItem);
  }

  async updateItem(id: number, updateItemDto: UpdateItemDto): Promise<Item> {
    const existingItem = await this.getItemById(id);
    Object.assign(existingItem, updateItemDto);
    return await this.itemRepository.save(existingItem);
  }

  async deleteItem(id: number): Promise<boolean> {
    const result = await this.itemRepository.delete(id);
    return result.affected > 0;
  }
}
