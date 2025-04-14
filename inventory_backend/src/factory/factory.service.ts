import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Factory } from './entities/factory.entity';
import { CreateFactoryDto } from './dto/create-factory.dto';
import { UpdateFactoryDto } from './dto/update-factory.dto';

@Injectable()
export class FactoryService {
  constructor(
    @InjectRepository(Factory)
    private readonly factoryRepository: Repository<Factory>,
  ) {}

  async getAllFactories(): Promise<Factory[]> {
    return await this.factoryRepository.find();
  }

  async getFactoryById(factoryId: number): Promise<Factory> {
    const factory = await this.factoryRepository.findOne({
      where: { factoryId },
    });

    if (!factory) {
      throw new NotFoundException(`Factory with ID ${factoryId} not found`);
    }

    return factory;
  }

  async createFactory(factoryDto: CreateFactoryDto): Promise<Factory> {
    const newFactory = this.factoryRepository.create(factoryDto);
    return await this.factoryRepository.save(newFactory);
  }

  async updateFactory(
    factoryId: number,
    factoryDto: UpdateFactoryDto,
  ): Promise<Factory> {
    const existingFactory = await this.getFactoryById(factoryId);
    Object.assign(existingFactory, factoryDto);
    return await this.factoryRepository.save(existingFactory);
  }

  async deleteFactory(factoryId: number): Promise<boolean> {
    const result = await this.factoryRepository.delete(factoryId);
    return result.affected > 0;
  }
}
