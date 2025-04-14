import { IsNotEmpty, IsNumber, IsString, IsDate, Min, Max } from 'class-validator';

export class CreateUserExperienceDto {
  @IsNotEmpty({ message: 'Customer ID cannot be empty' })
  @IsNumber({}, { message: 'Customer ID must be a number' })
  readonly customerId: number;

  @IsNotEmpty({ message: 'Order detail ID cannot be empty' })
  @IsNumber({}, { message: 'Order detail ID must be a number' })
  readonly orderDetailId: number;

  @IsNotEmpty({ message: 'Experience text cannot be empty' })
  @IsString({ message: 'Experience text must be a string' })
  readonly experienceText: string;

  @IsNotEmpty({ message: 'Rating cannot be empty' })
  @IsNumber({}, { message: 'Rating must be a number' })
  @Min(1, { message: 'Rating must be at least 1' })
  @Max(5, { message: 'Rating cannot be greater than 5' })
  readonly rating: number;

  @IsNotEmpty({ message: 'Feedback date cannot be empty' })
  @IsDate({ message: 'Feedback date must be a valid date' })
  readonly feedbackDate: Date;
}
