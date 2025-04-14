import { Test, TestingModule } from '@nestjs/testing';
import { AddressService } from 'src/address/address.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from 'src/address/entities/address.entity';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';
import { UpdateAddressDto } from 'src/address/dto/update-address.dto';

describe('AddressService', () => {
  let service: AddressService;
  let repository: Repository<Address>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: getRepositoryToken(Address),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);
    repository = module.get<Repository<Address>>(getRepositoryToken(Address));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new address', async () => {
      const mockAddress = new Address();
      jest.spyOn(repository, 'create').mockReturnValue(mockAddress);
      jest.spyOn(repository, 'save').mockResolvedValue(mockAddress);

      const createAddressDto: CreateAddressDto = {
        region: 'TestRegion',
        city: 'TestCity',
        street: 'TestStreet',
        postal_code: '12345',
        country: 'TestCountry',
      };

      const result = await service.create(createAddressDto);

      expect(result).toEqual(mockAddress);
      expect(repository.create).toHaveBeenCalledWith(createAddressDto);
      expect(repository.save).toHaveBeenCalledWith(mockAddress);
    });
  });

  describe('findAll', () => {
    it('should return an array of addresses', async () => {
      const mockAddresses = [new Address(), new Address()];
      jest.spyOn(repository, 'find').mockResolvedValue(mockAddresses);

      const result = await service.findAll();

      expect(result).toEqual(mockAddresses);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return an address by ID', async () => {
      const mockAddress = new Address();
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockAddress);

      const result = await service.findOne(1);

      expect(result).toEqual(mockAddress);
      expect(repository.findOne).toHaveBeenCalledWith(1);
    });

    it('should return undefined if address is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      const result = await service.findOne(1);

      expect(result).toBeUndefined();
      expect(repository.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update an address by ID', async () => {
      const mockAddress = new Address();
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockAddress);
      jest.spyOn(repository, 'save').mockResolvedValue(mockAddress);

      const updateAddressDto: UpdateAddressDto = {
        region: 'UpdatedTestRegion',
      };

      const result = await service.update(1, updateAddressDto);

      expect(result).toEqual(mockAddress);
      expect(repository.findOne).toHaveBeenCalledWith(1);
      expect(repository.save).toHaveBeenCalledWith(mockAddress);
      expect(mockAddress.region).toEqual('UpdatedTestRegion');
    });

    it('should throw NotFoundException if address is not found during update', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      const updateAddressDto: UpdateAddressDto = {
        region: 'UpdatedTestRegion',
      };

      await expect(service.update(1, updateAddressDto)).rejects.toThrowError();
      expect(repository.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('remove', () => {
    it('should remove an address by ID', async () => {
      jest
        .spyOn(repository, 'delete')
        .mockResolvedValue({ raw: {}, affected: 1 });

      const result = await service.remove(1);

      expect(result).toBeTruthy();
      expect(repository.delete).toHaveBeenCalledWith(1);
    });

    it('should return false if address is not found during removal', async () => {
      jest
        .spyOn(repository, 'delete')
        .mockResolvedValue({ raw: {}, affected: 0 });

      const result = await service.remove(1);

      expect(result).toBeFalsy();
      expect(repository.delete).toHaveBeenCalledWith(1);
    });
  });
});
