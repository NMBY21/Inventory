import { IsNotEmpty, IsString } from 'class-validator';
import { Address } from '../../address/entities/address.entity';

export class CreateFactoryDto {
  @IsNotEmpty()
  @IsString()
  readonly factoryName: string;

  @IsNotEmpty()
  readonly address: Address;
}
