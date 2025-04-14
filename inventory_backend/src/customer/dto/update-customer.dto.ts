import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDTO } from './create-customer.dto';
import {IsNotEmpty, IsPhoneNumber, IsString} from "class-validator";

export class UpdateCustomerDTO extends PartialType(CreateCustomerDTO) {

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    readonly contactNumber: string;
}
