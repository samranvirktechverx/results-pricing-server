import {
  IsNotEmpty,
  IsEmail,
  Length,
  IsOptional,
  IsString,
} from 'class-validator';

export class IAddress {
  street: string;
  city: string;
  state: string;
  zip: number;
}

export class IPersons {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  detail?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(10)
  phone: string;
}
