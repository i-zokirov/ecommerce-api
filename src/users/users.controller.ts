import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthenticateUserDto } from "./dto/authenticate-user.dto";
import CreateUserDto from "./dto/create-user.dto";
import { UsersService } from "./users.service";

@Controller("auth")
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService
    ) {}

    @Post("/signup")
    signup(@Body() createUserDto: CreateUserDto) {
        return this.authService.signup(createUserDto);
    }
    @Post("/signin")
    signin(@Body() body: AuthenticateUserDto) {
        return this.authService.signin(body);
    }
}
