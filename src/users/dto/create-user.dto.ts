import { IsEmail, IsString, IsOptional, IsEnum } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { UserRole } from "../entities/user.entity";

export default class CreateUserDto {
    @IsEmail()
    @ApiProperty({
        type: String,
        description: "email address",
        example: `jon.doe${Math.floor(Math.random() * 10000)}@example.com`,
    })
    email: string;
    @IsString()
    @ApiProperty({ type: String, description: "password", example: "123" })
    password: string;
    @IsString()
    @ApiProperty({ type: String, description: "given name", example: "Jon" })
    firstname: string;
    @IsString()
    @ApiProperty({ type: String, description: "family name", example: "Doe" })
    lastname: string;
    @IsEnum(UserRole)
    @IsOptional()
    @ApiPropertyOptional({
        enum: [UserRole.Admin, UserRole.User],
        description: "User role: Admin | User",
        examples: [UserRole.Admin, UserRole.User],
    })
    role: UserRole;
}
