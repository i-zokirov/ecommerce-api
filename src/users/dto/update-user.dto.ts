import { IsEmail, IsString, IsOptional, IsEnum } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export default class UpdateUserDto {
    @IsEmail()
    @IsOptional()
    @ApiPropertyOptional({
        type: String,
        description: "email address",
        example: "jon.doe@example.com",
    })
    email: string;
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        type: String,
        description: "given name",
        example: "Jon",
    })
    firstname: string;
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        type: String,
        description: "family name",
        example: "Doe",
    })
    lastname: string;
}
