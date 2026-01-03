import { IsString, IsNotEmpty, MinLength, IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Username of the user',
    example: 'ali123',
    minLength: 3,
  })
  @IsNotEmpty({ message: 'Username is required' })
  @IsString()
  @MinLength(3, { message: 'Username must be at least 3 characters' })
  @Transform(({ value }) => value.trim())
  username: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'ali@example.com',
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email is not valid' })
  @Transform(({ value }) => value.toLowerCase().trim())
  email: string;

  @ApiProperty({
    description: 'Password for login',
    example: 'strongPass123',
    minLength: 6,
  })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;
}