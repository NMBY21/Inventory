import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  async getAllEmployees(): Promise<Employee[]> {
    try {
      return await this.employeeService.getAllEmployees();
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve employees',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getEmployeeById(@Param('id') id: number): Promise<Employee> {
    const employee = await this.employeeService.getEmployeeById(id);
    if (!employee) {
      throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
    }
    return employee;
  }

  @Post()
  async createEmployee(
    @Body() createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    try {
      return await this.employeeService.createEmployee(createEmployeeDto);
    } catch (error) {
      throw new HttpException(
        'Failed to create employee',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async updateEmployee(
    @Param('id') id: number,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    const updatedEmployee = await this.employeeService.updateEmployee(
      id,
      updateEmployeeDto,
    );
    if (!updatedEmployee) {
      throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
    }
    return updatedEmployee;
  }

  @Delete(':id')
  async removeEmployee(@Param('id') id: number): Promise<boolean> {
    const result = await this.employeeService.removeEmployee(id);
    if (!result) {
      throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}

