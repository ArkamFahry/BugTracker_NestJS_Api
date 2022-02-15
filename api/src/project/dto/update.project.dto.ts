import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString } from 'class-validator';
import { CreateProjectDto } from './create.project.dto';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @IsNumber()
  user_id: number;
  @IsString()
  name: string;
  @IsString()
  type: string;
  @IsString()
  description: string;
}
