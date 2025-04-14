import { PartialType } from '@nestjs/mapped-types';
import { CreateAddressDto } from './create-address.dto';

export class UpdateAddressDto extends PartialType(CreateAddressDto) {
    readonly region: string;
    readonly city: string;
    readonly street: string;
    readonly postal_code: string;
    readonly country: string;
}
