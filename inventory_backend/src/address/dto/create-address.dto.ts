import {IsNotEmpty, IsString} from "class-validator";

export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  readonly region: string;

  @IsNotEmpty()
  @IsString()
  readonly city: string;

  @IsNotEmpty()
  @IsString()
  readonly street: string;

  @IsString()
  readonly postal_code: string;

  @IsNotEmpty()
  @IsString()
  readonly country: string;
}
