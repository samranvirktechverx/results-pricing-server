import { IsNotEmpty, IsString } from 'class-validator';

export class GetLengthUserDto {
  @IsNotEmpty()
  @IsString()
  _id: string;

  @IsNotEmpty()
  @IsString()
  type: string;
}
