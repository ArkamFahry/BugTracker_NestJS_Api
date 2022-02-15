import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsNumber()
  user_id: number;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  type: string;
  @IsNotEmpty()
  @IsString()
  description: string;
}
