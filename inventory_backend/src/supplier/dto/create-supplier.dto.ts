import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { Address } from '../../address/entities/address.entity';

export class CreateSupplierDto {
  @IsNotEmpty({ message: 'Supplier name cannot be empty' })
  @IsString({ message: 'Supplier name must be a string' })
  readonly supplier_name: string;

  @IsNotEmpty({ message: 'Contact number cannot be empty' })
  @IsString({ message: 'Contact number must be a string' })
  readonly contact_number: string;

  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  readonly email: string;

  @IsNotEmpty()
  readonly address: Address;
}
