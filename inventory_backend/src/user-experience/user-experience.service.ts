import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserExperience } from './entities/user-experience.entity';
import { CreateUserExperienceDto } from './dto/create-user-experience.dto';
import { UpdateUserExperienceDto } from './dto/update-user-experience.dto';

@Injectable()
export class UserExperienceService {
  constructor(
    @InjectRepository(UserExperience)
    private readonly userExperienceRepository: Repository<UserExperience>,
  ) {}

  async getAllUserExperiences(): Promise<UserExperience[]> {
    return await this.userExperienceRepository.find();
  }

  async getUserExperienceById(id: number): Promise<UserExperience> {
    const userExperience = await this.userExperienceRepository.findOne({
      where: { experienceId: id },
    });

    if (!userExperience) {
      throw new NotFoundException(`User Experience with ID ${id} not found`);
    }

    return userExperience;
  }

  async createUserExperience(
    createUserExperienceDto: CreateUserExperienceDto,
  ): Promise<UserExperience> {
    const newUserExperience = this.userExperienceRepository.create(
      createUserExperienceDto,
    );
    return await this.userExperienceRepository.save(newUserExperience);
  }

  async updateUserExperience(
    id: number,
    updateUserExperienceDto: UpdateUserExperienceDto,
  ): Promise<UserExperience> {
    const existingUserExperience = await this.getUserExperienceById(id);
    Object.assign(existingUserExperience, updateUserExperienceDto);
    return await this.userExperienceRepository.save(existingUserExperience);
  }

  async deleteUserExperience(id: number): Promise<boolean> {
    const result = await this.userExperienceRepository.delete(id);
    return result.affected > 0;
  }
}
