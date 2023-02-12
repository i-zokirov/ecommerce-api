import {
    IsArray,
    IsString,
    IsNumber,
    Min,
    ValidationOptions,
    registerDecorator,
    ValidationArguments,
    buildMessage,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
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

function IsShippingAddress(
    prop?: string,
    validationOptions?: ValidationOptions
) {
    return function (object: Object, propName: string) {
        registerDecorator({
            name: "isShippingAddress",
            target: object.constructor,
            propertyName: propName,
            constraints: [prop],
            options: validationOptions,
            validator: {
                validate(value: Object, arg: ValidationArguments) {
                    return (
                        value.hasOwnProperty("street") &&
                        typeof value["street"] === "string" &&
                        value.hasOwnProperty("city") &&
                        typeof value["city"] === "string" &&
                        value.hasOwnProperty("postalCode") &&
                        typeof value["postalCode"] === "string" &&
                        value.hasOwnProperty("country") &&
                        typeof value["country"] === "string"
                    );
                },
                defaultMessage: buildMessage(
                    (eachPrefix) =>
                        `$property must be an object with properties: street, postalCode, city, country`,
                    validationOptions
                ),
            },
        });
    };
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
