import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class AuthenticateUserDto {
    @IsEmail()
    @ApiProperty({
        type: String,
        description: "email address",
        example: "jon.doe@example.com",
    })
    email: string;
    @IsString()
    @ApiProperty({ type: String, description: "password", example: "123" })
    password: string;
}
