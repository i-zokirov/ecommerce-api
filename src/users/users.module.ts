import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import User from "./entities/user.entity";
import { AuthService } from "./auth.service";
@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [UsersService, AuthService],
})
export class UsersModule {}
