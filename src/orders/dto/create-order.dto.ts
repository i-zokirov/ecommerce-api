import { IsArray, IsString, IsNumber, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { PaymentMethods } from "../entities/order.entity";
import IsShippingAddress from "../validators/IsShippingAddress";

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

class OrderItem {
    @IsNumber()
    productId: number;
    @IsNumber()
    @Min(1)
    qty: number;
}

export class CreateOrderDto {
    @IsString()
    @ApiProperty({
        type: String,
        description: "Payment method: Online | CashOnDelivery",
    })
    paymentMethod: PaymentMethods;

    @IsShippingAddress()
    @ApiProperty({
        type: ShippingAddress,
        description: "Shipping address object",
    })
    shippingAddress: ShippingAddress;

    @IsArray()
    @ApiProperty({ type: Array, description: "Array of product ids" })
    orderitems: OrderItem[];
}
