import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import User from "../entities/user.entity";
import { UsersService } from "../users.service";
declare global {
    namespace Express {
        interface Request {
            currentUser?: User;
            session?: any;
        }
    }
}

@Injectable()
export default class CurrentUserMiddleware implements NestMiddleware {
    constructor(private readonly usersService: UsersService) {}
    async use(req: Request, res: Response, next: NextFunction) {
        const { userId } = req.session || {};
        if (userId) {
            const user = await this.usersService.findById(userId);
            req.currentUser = user;
        }
        next();
    }
}
