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
  BadRequestException,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  async findAll(): Promise<Item[]> {
    try {
      return await this.itemService.getAllItems();
    } catch (error) {
      throw new BadRequestException('Invalid request to get all items');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Item> {
    try {
      const item = await this.itemService.getItemById(+id);
      if (!item) {
        throw new NotFoundException(`Item with ID ${id} not found`);
      }
      return item;
    } catch (error) {
      throw new BadRequestException(
        `Invalid request to get item with ID ${id}`,
      );
    }
  }

  @Post()
  async create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    try {
      return await this.itemService.createItem(createItemDto);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Item with the same name already exists');
      } else {
        throw new BadRequestException('Invalid request to create item');
      }
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
  ): Promise<Item> {
    try {
      return await this.itemService.updateItem(+id, updateItemDto);
    } catch (error) {
      throw new BadRequestException(
        `Invalid request to update item with ID ${id}`,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<boolean> {
    try {
      const deleted = await this.itemService.deleteItem(+id);
      if (!deleted) {
        throw new NotFoundException(`Item with ID ${id} not found`);
      }
      return deleted;
    } catch (error) {
      throw new BadRequestException(
        `Invalid request to delete item with ID ${id}`,
      );
    }
  }
}
