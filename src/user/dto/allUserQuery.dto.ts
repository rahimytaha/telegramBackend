import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class AllUserQueryDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  username: string;
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  email: string;

  @ApiProperty({ required: false, default: 1, minimum: 1 })
  @IsOptional()
  @Transform(({ value }) => {
    const num = parseInt(value, 10);
    return isNaN(num) ? 1 : num;
  })
  @IsNumber({}, { message: 'page must be a number' })
  @Min(1, { message: 'page must be at least 1' })
  page: number = 1;

  @ApiProperty({ required: false, default: 10, minimum: 1 })
  @IsOptional()
  @Transform(({ value }) => {
    const num = parseInt(value, 10);
    return isNaN(num) ? 10 : num;
  })
  @IsNumber({}, { message: 'perPage must be a number' })
  @Min(1, { message: 'perPage must be at least 1' })
  perPage: number = 10;
}
