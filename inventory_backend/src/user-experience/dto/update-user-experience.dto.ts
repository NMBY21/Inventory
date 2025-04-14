import { PartialType } from '@nestjs/mapped-types';
import { CreateUserExperienceDto } from './create-user-experience.dto';

export class UpdateUserExperienceDto extends PartialType(
  CreateUserExperienceDto,
) {}
