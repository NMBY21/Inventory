import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  async getAllTransactions() {
    try {
      const transactions = await this.transactionService.getAllTransactions();
      return transactions;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get(':id')
  async getTransactionById(@Param('id') id: string) {
    try {
      const transaction = await this.transactionService.getTransactionById(+id);
      if (!transaction) {
        throw new NotFoundException(`Transaction with ID ${id} not found`);
      }
      return transaction;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Post()
  async createTransaction(@Body() createTransactionDto: CreateTransactionDto) {
    try {
      return await this.transactionService.createTransaction(
        createTransactionDto,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Patch(':id')
  async updateTransaction(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    try {
      const updatedTransaction =
        await this.transactionService.updateTransaction(
          +id,
          updateTransactionDto,
        );
      if (!updatedTransaction) {
        throw new NotFoundException(`Transaction with ID ${id} not found`);
      }
      return updatedTransaction;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete(':id')
  async deleteTransaction(@Param('id') id: string) {
    try {
      const result = await this.transactionService.deleteTransaction(+id);
      if (!result) {
        throw new NotFoundException(`Transaction with ID ${id} not found`);
      }
      return { data: { affectedRows: result }, success: true };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
