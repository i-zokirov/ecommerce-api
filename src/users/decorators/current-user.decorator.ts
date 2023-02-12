import { createParamDecorator, ExecutionContext } from "@nestjs/common";

const CurrentUser = createParamDecorator(
    (data: never, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        return request.currentUser;
    }
);

export default CurrentUser;
