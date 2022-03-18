import { IsAlphanumeric, IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Firstname must be a string' })
  first_name: string;

  @IsString({ message: 'Lastname must be a string' })
  last_name: string;

  @IsAlphanumeric('en-US', { message: 'Username must be alphanumeric' })
  username: string;

  @IsEmail({}, { message: 'Email is not valid' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;
}
