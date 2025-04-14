import { IsNotEmpty, IsString, IsDate } from 'class-validator';
import { Factory } from '../../factory/entities/factory.entity';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @IsNotEmpty()
  @IsString()
  readonly position: string;

  @IsNotEmpty()
  @IsDate()
  readonly hireDate: Date;

  @IsNotEmpty()
  factory: Factory;
}
