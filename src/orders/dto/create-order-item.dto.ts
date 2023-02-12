import { IsUrl, IsString, IsNumber, Min, Max } from "class-validator";
import Product from "src/products/entities/product.entity";

export default class CreateOrderItemDto {
    @IsString()
    name: string;
    @IsUrl()
    image: string;
    @IsNumber()
    @Min(0)
    @Max(1000000)
    price: number;
    @IsNumber()
    @Min(0)
    @Max(1000000)
    qty: number;
    @IsNumber()
    product: Partial<Product>;
}
