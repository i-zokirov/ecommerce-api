import { IsEmail, IsString, IsOptional, IsEnum } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export default class UpdateUserDto {
    @IsEmail()
    @IsOptional()
    @ApiPropertyOptional({ type: String, description: "email address" })
    email: string;
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({ type: String, description: "given name" })
    firstname: string;
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({ type: String, description: "family name" })
    lastname: string;
}
