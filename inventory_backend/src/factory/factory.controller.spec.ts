import { Test, TestingModule } from '@nestjs/testing';
import { FactoryController } from './factory.controller';
import { FactoryService } from './factory.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FactoryEntity } from './entities/factory.entity';

describe('FactoryController', () => {
  let controller: FactoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FactoryController],
      providers: [
        FactoryService,
        {
          provide: getRepositoryToken(FactoryEntity),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<FactoryController>(FactoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
