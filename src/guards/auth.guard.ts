import { CanActivate, ExecutionContext } from "@nestjs/common";

export default class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        if (!request.currentUser) {
            return false;
        }
        return Boolean(request.session.userId);
    }
}
