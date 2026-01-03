import { IsString, IsNotEmpty, MinLength, IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ example: 'ali123' })
  @IsNotEmpty({ message: 'Username is required' })
  @IsString()
  @MinLength(3)
  @Transform(({ value }) => value.trim())
  username: string;

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
