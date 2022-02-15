import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString } from 'class-validator';
import { CreateTicketDto } from './create-ticket.dto';

export class UpdateTicketDto extends PartialType(CreateTicketDto) {
  @IsNumber()
  bug_id: number;
  @IsNumber()
  user_id: number;
  @IsString()
  created: Date;
  @IsString()
  closed: Date;
  @IsString()
  description: string;
  @IsString()
  type: string;
  @IsString()
  sevierity: string;
  @IsNumber()
  progress: number;
}
