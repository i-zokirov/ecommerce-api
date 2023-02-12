import {
    ExecutionContext,
    NestInterceptor,
    CallHandler,
    UseInterceptors,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToClass } from "class-transformer";

interface ClassContructor {
    new (...args: any[]): {};
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: ClassContructor) {}
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>
    ): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map((data) =>
                plainToClass(this.dto, data, {
                    excludeExtraneousValues: true,
                })
            )
        );
    }
}

export default function Serialize(dto: ClassContructor) {
    return UseInterceptors(new SerializeInterceptor(dto));
}
