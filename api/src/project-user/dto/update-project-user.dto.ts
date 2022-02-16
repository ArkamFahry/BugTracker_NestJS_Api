import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectUserDto } from './create-project-user.dto';

export class UpdateProjectUserDto extends PartialType(CreateProjectUserDto) {
  project_id: number;
  project_user: number;
}
