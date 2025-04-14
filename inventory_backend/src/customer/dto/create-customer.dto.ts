import { IsNotEmpty, IsString, IsPhoneNumber, } from 'class-validator';
import {Address} from "../../address/entities/address.entity";

export class CreateCustomerDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  readonly contactNumber: string;

  @IsNotEmpty()
  readonly address: Address;
}
