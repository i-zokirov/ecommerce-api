import { IsArray, IsString, IsNumber, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { PaymentMethods } from "../entities/order.entity";
import IsShippingAddress from "../validators/IsShippingAddress";

class ShippingAddress {
    @IsString()
    @ApiProperty({
        type: String,
        example: "Somewhere St",
    })
    street: string;
    @IsString()
    @ApiProperty({
        type: String,
        example: "Some city",
    })
    city: string;
    @IsString()
    @ApiProperty({
        type: String,
        example: "12345a",
    })
    postalCode: string;
    @IsString()
    @ApiProperty({
        type: String,
        example: "Lalaland",
    })
    country: string;
}

class OrderItem {
    @IsNumber()
    @ApiProperty({
        type: Number,
        example: 1,
    })
    productId: number;
    @IsNumber()
    @Min(1)
    @ApiProperty({
        type: Number,
        example: 1,
    })
    qty: number;
}

export class CreateOrderDto {
    @IsString()
    @ApiProperty({
        enum: PaymentMethods,
        description: "Payment method: Online | CashOnDelivery",
        example: PaymentMethods.Online,
    })
    paymentMethod: PaymentMethods;

    @IsShippingAddress()
    @ApiProperty({
        type: ShippingAddress,
        description: "Shipping address object",
    })
    shippingAddress: ShippingAddress;

    @IsArray()
    @ApiProperty({ type: [OrderItem] })
    orderitems: OrderItem[];
}
