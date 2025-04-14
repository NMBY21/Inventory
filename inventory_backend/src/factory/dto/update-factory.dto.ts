import { PartialType } from '@nestjs/mapped-types';
import { CreateFactoryDto } from './create-factory.dto';
import {IsNotEmpty, IsString} from "class-validator";

export class UpdateFactoryDto extends PartialType(CreateFactoryDto) {
    @IsNotEmpty()
    @IsString()
    readonly factoryName: string;
}
