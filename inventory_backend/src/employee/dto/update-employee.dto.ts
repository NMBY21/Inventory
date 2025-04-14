import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';
import {IsNotEmpty, IsString} from "class-validator";

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
    @IsNotEmpty()
    @IsString()
    readonly firstName: string;

    @IsNotEmpty()
    @IsString()
    readonly lastName: string;

    @IsNotEmpty()
    @IsString()
    readonly position: string;
}
