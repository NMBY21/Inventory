import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserExperience } from './entities/user-experience.entity';
import { UserExperienceService } from './user-experience.service';
import { UserExperienceController } from './user-experience.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserExperience])],
  providers: [UserExperienceService],
  controllers: [UserExperienceController],
})
export class UserExperienceModule {}
