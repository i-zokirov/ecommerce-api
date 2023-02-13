import { IsArray, IsString, IsNumber, Min, IsEnum } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { OrderStatus } from "../entities/order.entity";

export class UpdateOrderDto {
    @IsEnum(OrderStatus)
    @ApiPropertyOptional({
        type: String,
        description: `order status. One of three values ${OrderStatus.Placed}, ${OrderStatus.Delivered}, ${OrderStatus.Cancelled}`,
    })
    status: OrderStatus;
}
