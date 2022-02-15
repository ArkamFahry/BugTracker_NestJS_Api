import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTicketDto {
  @IsNotEmpty()
  @IsNumber()
  bug_id: number;
  @IsNotEmpty()
  @IsNumber()
  user_id: number;
  @IsNotEmpty()
  @IsString()
  created: Date;
  @IsNotEmpty()
  @IsString()
  closed: Date;
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNotEmpty()
  @IsString()
  type: string;
  @IsNotEmpty()
  @IsString()
  sevierity: string;
  @IsNotEmpty()
  @IsNumber()
  progress: number;
}
