import { IAddress, IPersons } from 'src/types';
import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateHomeOwnerDto {
  @IsOptional()
  address?: IAddress;

  @IsNotEmpty()
  persons: IPersons[];

  @IsOptional()
  @IsString()
  clientManagerId?: string;

  @IsOptional()
  @IsString()
  creatorId?: string;
}

export class QueryHomeOwnerDto {
  @IsNumber()
  page: number;

  @IsNumber()
  size: number;

  @IsOptional()
  @IsNumber()
  skip?: number;

  @IsOptional()
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsString()
  firstName: string;
}
