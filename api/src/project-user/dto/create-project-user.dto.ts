import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProjectUserDto {
  @IsNotEmpty()
  @IsNumber()
  project_id: number;
  @IsNotEmpty()
  @IsNumber()
  project_user: number;
}
