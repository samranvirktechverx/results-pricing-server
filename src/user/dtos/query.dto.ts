import { IsOptional, IsString } from 'class-validator';

export class QueryDTO {
  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  firstName?: object;
}
