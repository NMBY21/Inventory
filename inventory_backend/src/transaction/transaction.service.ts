import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Order } from 'src/order/entities/order.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {}

  async getAllTransactions(): Promise<Transaction[]> {
    return await this.transactionRepository.find({
      relations: {
        order: true,
      },
    });
  }

  async getTransactionById(id: number): Promise<Transaction> {
    const transaction = await this.transactionRepository.findOne({
      where: { transaction_id: id },
    });

    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    return transaction;
  }

  async createTransaction(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const newTransaction = new Transaction();
    Object.assign(newTransaction, createTransactionDto);
    newTransaction.transaction_date = new Date();
    const order = await this.orderRepo.findOneBy({
      orderId: createTransactionDto.order.orderId,
    });
    order.status = 'completed';
    await this.orderRepo.save(order);
    // Any operation involving username should be done here
    return await this.transactionRepository.save(newTransaction);
  }

  async updateTransaction(
    id: number,
    updateTransactionDto: UpdateTransactionDto,
  ): Promise<Transaction> {
    const existingTransaction = await this.getTransactionById(id);
    Object.assign(existingTransaction, updateTransactionDto);
    return await this.transactionRepository.save(existingTransaction);
  }

  async deleteTransaction(id: number): Promise<boolean> {
    const result = await this.transactionRepository.delete(id);
    return result.affected > 0;
  }
}
