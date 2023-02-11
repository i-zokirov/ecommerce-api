import { IsUrl, IsString, IsNumber, Min, Max } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { PaymentMethods } from "../entities/order.entity";

class ShippingAddress {
    @IsString()
    street: string;
    @IsString()
    city: string;
    @IsString()
    postalCode: string;
    @IsString()
    country: string;
}

export class CreateOrderDto {
    @IsString()
    paymentMethod: PaymentMethods;
    shippingAddress: ShippingAddress;
}
