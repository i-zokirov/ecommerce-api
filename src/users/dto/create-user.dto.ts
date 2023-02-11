import { IsEmail, IsString, IsOptional, IsEnum } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { UserRole } from "../entities/user.entity";

export default class CreateUserDto {
    @IsEmail()
    @ApiProperty({ type: String, description: "email address" })
    email: string;
    @IsString()
    @ApiProperty({ type: String, description: "password" })
    password: string;
    @IsString()
    @ApiProperty({ type: String, description: "given name" })
    firstname: string;
    @IsString()
    @ApiProperty({ type: String, description: "family name" })
    lastname: string;
    @IsEnum(UserRole)
    @IsOptional()
    @ApiPropertyOptional({
        enum: [UserRole.Admin, UserRole.User],
        description: "User role: Admin | User",
    })
    role: UserRole;
}
