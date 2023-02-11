import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { AuthenticateUserDto } from "./dto/authenticate-user.dto";
import CreateUserDto from "./dto/create-user.dto";
import { UserRole } from "./entities/user.entity";
import { UsersService } from "./users.service";

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async signup(createUserDto: CreateUserDto) {
        const users = await this.usersService.find(createUserDto.email);
        if (users.length) {
            throw new BadRequestException("Email already in use");
        }
        const salt = randomBytes(8).toString("hex");
        const hash = (await scrypt(createUserDto.password, salt, 32)) as Buffer;
        const result = salt + "." + hash.toString("hex");
        Object.assign(createUserDto, { password: result, role: UserRole.User });
        return this.usersService.create(createUserDto);
    }

    async signin({ email, password }: AuthenticateUserDto) {
        const [user] = await this.usersService.find(email);
        if (!user) {
            throw new NotFoundException("User not found");
        }
        const [salt, storedHash] = user.password.split(".");
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        if (storedHash !== hash.toString("hex")) {
            throw new BadRequestException("Invalid credentials");
        }
        return user;
    }
}
