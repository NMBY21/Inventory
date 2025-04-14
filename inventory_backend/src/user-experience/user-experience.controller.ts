import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UserExperienceService } from './user-experience.service';
import { CreateUserExperienceDto } from './dto/create-user-experience.dto';
import { UpdateUserExperienceDto } from './dto/update-user-experience.dto';

@Controller('user-experience')
export class UserExperienceController {
  constructor(private readonly userExperienceService: UserExperienceService) {}

  @Get()
  async getAllUserExperiences() {
    try {
      return await this.userExperienceService.getAllUserExperiences();
    } catch (error) {
      throw new NotFoundException('User experiences not found.');
    }
  }

  @Get(':id')
  async getUserExperienceById(@Param('id') id: string) {
    const userExperience =
      await this.userExperienceService.getUserExperienceById(+id);
    if (!userExperience) {
      throw new NotFoundException(`User experience with ID ${id} not found.`);
    }
    return userExperience;
  }

  @Post()
  async createUserExperience(
    @Body() createUserExperienceDto: CreateUserExperienceDto,
  ) {
    try {
      return await this.userExperienceService.createUserExperience(
        createUserExperienceDto,
      );
    } catch (error) {
      throw new BadRequestException('Invalid user experience data.');
    }
  }

  @Patch(':id')
  async updateUserExperience(
    @Param('id') id: string,
    @Body() updateUserExperienceDto: UpdateUserExperienceDto,
  ) {
    const updatedUserExperience =
      await this.userExperienceService.updateUserExperience(
        +id,
        updateUserExperienceDto,
      );
    if (!updatedUserExperience) {
      throw new NotFoundException(`User experience with ID ${id} not found.`);
    }
    return updatedUserExperience;
  }

  @Delete(':id')
  async deleteUserExperience(@Param('id') id: string) {
    const deleted = await this.userExperienceService.deleteUserExperience(+id);
    if (!deleted) {
      throw new NotFoundException(`User experience with ID ${id} not found.`);
    }
    return { success: true };
  }
}
