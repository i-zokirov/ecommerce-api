import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import User from "./entities/user.entity";
import CreateUserDto from "./dto/create-user.dto";
@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repository: Repository<User>) {}
    findById(id: number) {
        if (!id) return null;
        return this.repository.findOneBy({ id });
    }

    find(email: string) {
        return this.repository.find({ where: { email } });
    }

    list() {
        return this.repository.find();
    }

    create(createUserDto: CreateUserDto) {
        const user = this.repository.create(createUserDto);
        return this.repository.save(user);
    }

    async update(id: number, attrs: Partial<User>) {
        const user = await this.findById(id);
        if (!user) {
            throw new NotFoundException("User not found");
        }
        Object.assign(user, attrs);
        return this.repository.save(user);
    }
    async remove(id: number) {
        const user = await this.findById(id);
        if (!user) {
            throw new NotFoundException("User not found");
        }
        return this.repository.remove(user);
    }
}
