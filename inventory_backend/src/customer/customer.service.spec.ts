import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';

describe('CustomerService', () => {
  let service: CustomerService;
  let repository: Repository<Customer>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: getRepositoryToken(Customer),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
    repository = module.get<Repository<Customer>>(getRepositoryToken(Customer));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new customer', async () => {
      const mockCustomer = new Customer();
      jest.spyOn(repository, 'create').mockReturnValue(mockCustomer);
      jest.spyOn(repository, 'save').mockResolvedValue(mockCustomer);

      const createCustomerDto = {
        firstName: 'John',
        lastName: 'Doe',
        contactNumber: '1234567890',
        userId: 1,
      };

      const result = await service.create(createCustomerDto);

      expect(result).toEqual(mockCustomer);
      expect(repository.create).toHaveBeenCalledWith(createCustomerDto);
      expect(repository.save).toHaveBeenCalledWith(mockCustomer);
    });
  });

  describe('findAll', () => {
    it('should return an array of customers', async () => {
      const mockCustomers = [new Customer(), new Customer()];
      jest.spyOn(repository, 'find').mockResolvedValue(mockCustomers);

      const result = await service.findAll();

      expect(result).toEqual(mockCustomers);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a customer by ID', async () => {
      const mockCustomer = new Customer();
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockCustomer);

      const result = await service.findOne(1);

      expect(result).toEqual(mockCustomer);
      expect(repository.findOne).toHaveBeenCalledWith(1);
    });

    it('should return undefined if customer is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      const result = await service.findOne(1);

      expect(result).toBeUndefined();
      expect(repository.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a customer by ID', async () => {
      const mockCustomer = new Customer();
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockCustomer);
      jest.spyOn(repository, 'save').mockResolvedValue(mockCustomer);

      const updateCustomerDto = {
        firstName: 'UpdatedJohn',
      };

      const result = await service.update(1, updateCustomerDto);

      expect(result).toEqual(mockCustomer);
      expect(repository.findOne).toHaveBeenCalledWith(1);
      expect(repository.save).toHaveBeenCalledWith(mockCustomer);
      expect(mockCustomer.firstName).toEqual('UpdatedJohn');
    });

    it('should throw NotFoundException if customer is not found during update', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      const updateCustomerDto = {
        firstName: 'UpdatedJohn',
      };

      await expect(service.update(1, updateCustomerDto)).rejects.toThrowError();
      expect(repository.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('remove', () => {
    it('should remove a customer by ID', async () => {
      jest
        .spyOn(repository, 'delete')
        .mockResolvedValue({ raw: {}, affected: 1 });

      const result = await service.remove(1);

      expect(result).toBeTruthy();
      expect(repository.delete).toHaveBeenCalledWith(1);
    });

    it('should return false if customer is not found during removal', async () => {
      jest
        .spyOn(repository, 'delete')
        .mockResolvedValue({ raw: {}, affected: 0 });

      const result = await service.remove(1);

      expect(result).toBeFalsy();
      expect(repository.delete).toHaveBeenCalledWith(1);
    });
  });
});
