import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AuthSignUpDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsNumber()
  phone: number;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  role: string;
}
