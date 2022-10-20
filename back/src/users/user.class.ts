import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber } from "class-validator";

export class User {
    @IsEmail()
    @IsNotEmpty()
    login: string;

    @IsNotEmpty()
    password: string;

    data: UserData;
}

export class UserData {
    @IsNotEmpty()
    name: string;

    @IsPhoneNumber()
    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    address: string;

    @IsOptional()
    info: string;
}

export class EditUserData {
    @IsNotEmpty()
    @IsOptional()
    name: string;

    @IsPhoneNumber()
    @IsNotEmpty()
    @IsOptional()
    phone: string;

    @IsNotEmpty()
    @IsOptional()
    address: string;

    @IsOptional()
    info: string;
}