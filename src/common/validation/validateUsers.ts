import {IsEmail, IsNotEmpty, IsString, Max, Min} from 'class-validator'

export class ValidateUser {

    @IsString()
    @Min(1)
    @Max(50)
    @IsNotEmpty()
    firstName: string

    @IsEmail()
    @Min(3)
    @Max(255)
    @IsNotEmpty()
    email: string

    @IsString()
    @Min(6)
    @Max(10)
    @IsNotEmpty()
    password: string

    
    address: object

}