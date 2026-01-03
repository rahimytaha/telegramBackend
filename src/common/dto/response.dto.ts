import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ResponseDto<T> {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Operation successful' })
  message: string;

  @ApiPropertyOptional()
  data?: T;

  @ApiPropertyOptional({ example: null })
  error?: any;
}
