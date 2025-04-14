// src/modules/address/address.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AddressController } from 'src/address/address.controller';
import { AddressService } from 'src/address/address.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from 'src/address/entities/address.entity';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';
import { UpdateAddressDto } from 'src/address/dto/update-address.dto';
import { NotFoundException } from '@nestjs/common';

describe('AddressController', () => {
  let controller: AddressController;
  let service: AddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressController],
      providers: [
        AddressService,
        {
          provide: getRepositoryToken(Address),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<AddressController>(AddressController);
    service = module.get<AddressService>(AddressService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new address', async () => {
      const mockAddress = new Address();
      jest.spyOn(service, 'create').mockResolvedValue(mockAddress);

      const createAddressDto: CreateAddressDto = {
        region: 'TestRegion',
        city: 'TestCity',
        street: 'TestStreet',
        postal_code: '12345',
        country: 'TestCountry',
      };

      const result = await controller.create(createAddressDto);

      expect(result).toEqual(mockAddress);
      expect(service.create).toHaveBeenCalledWith(createAddressDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of addresses', async () => {
      const mockAddresses = [new Address(), new Address()];
      jest.spyOn(service, 'findAll').mockResolvedValue(mockAddresses);

      const result = await controller.findAll();

      expect(result).toEqual(mockAddresses);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return an address by ID', async () => {
      const mockAddress = new Address();
      jest.spyOn(service, 'findOne').mockResolvedValue(mockAddress);

      const result = await controller.findOne('1');

      expect(result).toEqual(mockAddress);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should return undefined if address is not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(undefined);

      const result = await controller.findOne('1');

      expect(result).toBeUndefined();
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update an address by ID', async () => {
      const mockAddress = new Address();
      jest.spyOn(service, 'update').mockResolvedValue(mockAddress);

      const updateAddressDto: UpdateAddressDto = {
        region: 'UpdatedTestRegion',
      };

      const result = await controller.update('1', updateAddressDto);

      expect(result).toEqual(mockAddress);
      expect(service.update).toHaveBeenCalledWith(1, updateAddressDto);
    });

    it('should throw NotFoundException if address is not found during update', async () => {
      jest.spyOn(service, 'update').mockRejectedValue(new NotFoundException());

      const updateAddressDto: UpdateAddressDto = {
        region: 'UpdatedTestRegion',
      };

      await expect(
        controller.update('1', updateAddressDto),
      ).rejects.toThrowError();
      expect(service.update).toHaveBeenCalledWith(1, updateAddressDto);
    });
  });

  describe('remove', () => {
    it('should remove an address by ID', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(true);

      const result = await controller.remove('1');

      expect(result).toBeTruthy();
      expect(service.remove).toHaveBeenCalledWith(1);
    });

    it('should return false if address is not found during removal', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(false);

      const result = await controller.remove('1');

      expect(result).toBeFalsy();
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
