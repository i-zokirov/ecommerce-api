import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class AuthenticateUserDto {
    @IsEmail()
    @ApiProperty({ type: String, description: "email address" })
    email: string;
    @IsString()
    @ApiProperty({ type: String, description: "password" })
    password: string;
}
