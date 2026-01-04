import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class JoinRoomDto {
//   @IsString()
//   @Transform(({ value }) => value.toString())
  roomId: number;
}
