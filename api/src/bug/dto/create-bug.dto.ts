import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBugDto {
  @IsNotEmpty()
  @IsNumber()
  project_id: number;
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
  @IsNotEmpty()
  @IsString()
  sevierity: string;
  @IsNotEmpty()
  @IsNumber()
  progress: number;
  @IsNotEmpty()
  @IsString()
  issue_created: Date;
  @IsNotEmpty()
  @IsString()
  issue_closed: Date;
}
