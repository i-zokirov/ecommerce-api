import { IsEnum } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { OrderStatus } from "../entities/order.entity";

export class UpdateOrderDto {
    @IsEnum(OrderStatus)
    @ApiPropertyOptional({
        enum: OrderStatus,
        description: `order status. One of three values ${OrderStatus.Placed}, ${OrderStatus.Delivered}, ${OrderStatus.Cancelled}`,
        examples: [
            OrderStatus.Placed,
            OrderStatus.Delivered,
            OrderStatus.Cancelled,
        ],
    })
    status: OrderStatus;
}
