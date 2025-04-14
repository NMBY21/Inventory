import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async getAllEmployees(): Promise<Employee[]> {
    return await this.employeeRepository.find();
  }

  async getEmployeeById(id: number): Promise<Employee> {
    return await this.employeeRepository.findOne({ where: { id } });
  }

  async getEmployeeByUsername(username: string): Promise<Employee> {
    return await this.employeeRepository.findOne({ where: { user: { username } }});
  }

  async createEmployee(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    const newEmployee = this.employeeRepository.create(createEmployeeDto);
    newEmployee.hireDate = new Date();
    return await this.employeeRepository.save(newEmployee);
  }

  async updateEmployee(
    id: number,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    const existingEmployee = await this.getEmployeeById(id);
    Object.assign(existingEmployee, updateEmployeeDto);
    return await this.employeeRepository.save(existingEmployee);
  }

  async removeEmployee(id: number): Promise<boolean> {
    const result = await this.employeeRepository.delete(id);
    return result.affected > 0;
  }
}
