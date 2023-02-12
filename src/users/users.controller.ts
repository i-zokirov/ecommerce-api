import {
    Body,
    Controller,
    Post,
    Session,
    Get,
    UseGuards,
    Patch,
    Delete,
    Param,
} from "@nestjs/common";
import AdminGuard from "src/guards/admin.guard";
import AuthGuard from "src/guards/auth.guard";
import Serialize from "../interceptors/serialize.interceptor";
import { AuthService } from "./auth.service";
import { AuthenticateUserDto } from "./dto/authenticate-user.dto";
import CreateUserDto from "./dto/create-user.dto";
import UserPrivateDto from "./dto/private-user.dto";
import UserPublicDto from "./dto/public-user.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService
    ) {}

    @Post("/auth/signup")
    @Serialize(UserPublicDto)
    async signup(
        @Body() createUserDto: CreateUserDto,
        @Session() session: any
    ) {
        const user = await this.authService.signup(createUserDto);
        session.userId = user.id;
        return user;
    }
    @Post("/auth/signin")
    @Serialize(UserPublicDto)
    async signin(@Body() body: AuthenticateUserDto, @Session() session: any) {
        const user = await this.authService.signin(body);
        session.userId = user.id;
        return user;
    }

    @Post("/auth/signout")
    signout(@Session() session: any) {
        session.userId = null;
    }

    @Get("/")
    @UseGuards(AdminGuard)
    @Serialize(UserPublicDto)
    listAllUsers() {
        return this.usersService.list();
    }

    @Get("/admin")
    @UseGuards(AdminGuard)
    @Serialize(UserPrivateDto)
    listAllUsersAdmin() {
        return this.usersService.list();
    }

    @Get("/:id")
    @UseGuards(AuthGuard)
    @Serialize(UserPublicDto)
    getUser(@Param("id") id: string) {
        return this.usersService.findById(parseInt(id));
    }

    @Get("/:id/admin")
    @UseGuards(AuthGuard)
    @Serialize(UserPrivateDto)
    getUserForAdmin(@Param("id") id: string) {
        return this.usersService.findById(parseInt(id));
    }
}
