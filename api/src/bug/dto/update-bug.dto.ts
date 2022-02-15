import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateBugDto } from './create-bug.dto';

export class UpdateBugDto extends PartialType(CreateBugDto) {
  @IsNumber()
  project_id: number;
  @IsNumber()
  user_id: number;
  @IsString()
  name: string;
  @IsString()
  type: string;
  @IsString()
  description: string;
  @IsString()
  sevierity: string;
  @IsNumber()
  progress: number;
  @IsString()
  issue_created: Date;
  @IsString()
  issue_closed: Date;
}
