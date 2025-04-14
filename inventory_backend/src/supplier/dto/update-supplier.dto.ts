import { PartialType } from '@nestjs/mapped-types';
import { CreateSupplierDto } from './create-supplier.dto';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateSupplierDto extends PartialType(CreateSupplierDto) {
  @IsString({ message: 'Supplier name must be a string' })
  readonly supplier_name: string;

  @IsString({ message: 'Contact number must be a string' })
  readonly contact_number: string;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  readonly email: string;
}
