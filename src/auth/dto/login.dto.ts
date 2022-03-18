import {
  IsAlphanumeric,
  IsEmail,
  IsLowercase,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class LoginDto {
  @IsAlphanumeric('en-US', { message: 'Username must be alphanumeric' })
  @IsLowercase({ message: 'Username must be lowercase' })
  @MinLength(5, { message: 'Username must be at least 5 characters' })
  @ValidateIf(o => !o.email)
  username: string;

  @IsEmail({}, { message: 'Invalid email address' })
  @ValidateIf(o => !o.username)
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;
}
