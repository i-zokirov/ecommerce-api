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
    UnauthorizedException,
} from "@nestjs/common";
import { ApiOperation, ApiParam } from "@nestjs/swagger";
import AdminGuard from "../guards/admin.guard";
import AuthGuard from "../guards/auth.guard";
import Serialize from "../interceptors/serialize.interceptor";
import { AuthService } from "./auth.service";
import { AuthenticateUserDto } from "./dto/authenticate-user.dto";
import CreateUserDto from "./dto/create-user.dto";
import UserPrivateDto from "./dto/private-user.dto";
import UserPublicDto from "./dto/public-user.dto";
import User from "./entities/user.entity";
import { UsersService } from "./users.service";
import CurrentUser from "./decorators/current-user.decorator";
import UpdateUserDto from "./dto/update-user.dto";

@Controller("users")
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService
    ) {}

    @Post("/auth/signup")
    @ApiOperation({
        summary: "User Registration route",
    })
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
    @ApiOperation({ summary: "User login route" })
    @Serialize(UserPublicDto)
    async signin(@Body() body: AuthenticateUserDto, @Session() session: any) {
        const user = await this.authService.signin(body);
        session.userId = user.id;
        return user;
    }

    @Post("/auth/signout")
    @ApiOperation({ summary: "User logout route" })
    signout(@Session() session: any) {
        session.userId = null;
    }

    @Get("/admin")
    @UseGuards(AdminGuard)
    @ApiOperation({ summary: "Lists all users for Admin" })
    @Serialize(UserPrivateDto)
    listAllUsersAdmin() {
        return this.usersService.list();
    }

    @Get("/:id")
    @UseGuards(AuthGuard)
    @ApiOperation({
        summary:
            "Fetches user profile by id if it belongs to the currently authenticated user",
    })
    @ApiParam({ name: "id", type: "number" })
    @Serialize(UserPublicDto)
    getUser(@Param("id") id: string) {
        return this.usersService.findById(parseInt(id));
    }

    @Get("/:id/admin")
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: "Fetches user profile by id for admin" })
    @ApiParam({ name: "id", type: "number" })
    @Serialize(UserPrivateDto)
    getUserForAdmin(@Param("id") id: string) {
        return this.usersService.findById(parseInt(id));
    }

    @Patch("/:id")
    @UseGuards(AuthGuard)
    @ApiOperation({
        summary:
            "Updates user profile by id if it belongs to the currently authenticated user",
    })
    @ApiParam({ name: "id", type: "number" })
    @Serialize(UserPublicDto)
    updateUser(
        @Param("id") id: string,
        @CurrentUser() currentUser: User,
        @Body() body: UpdateUserDto
    ) {
        if (currentUser && currentUser.id !== parseInt(id)) {
            throw new UnauthorizedException("Not Authorized!");
        }
        return this.usersService.update(parseInt(id), body);
    }

    @Delete("/:id")
    @UseGuards(AuthGuard)
    @ApiOperation({
        summary:
            "Deletes user profile by id if it belongs to the currently authenticated user",
    })
    @ApiParam({ name: "id", type: "number" })
    @Serialize(UserPublicDto)
    deleteUser(
        @Param("id") id: string,
        @CurrentUser() currentUser: User,
        @Session() session: any
    ) {
        if (currentUser && currentUser.id !== parseInt(id)) {
            throw new UnauthorizedException("Not Authorized!");
        }
        session.userId = null;
        return this.usersService.remove(parseInt(id));
    }
}
