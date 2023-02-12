import { CanActivate, ExecutionContext } from "@nestjs/common";
import { UserRole } from "src/users/entities/user.entity";

export default class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        if (!request.currentUser) {
            return false;
        }
        return request.currentUser.role === UserRole.Admin;
    }
}
