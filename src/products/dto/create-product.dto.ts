import { IsUrl, IsString, IsNumber, Min, Max } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
    @IsString()
    @ApiProperty({
        type: String,
        description: "product title",
    })
    name: string;

    @IsUrl()
    @ApiProperty({
        type: String,
        description: "product image url",
    })
    image: string;

    @IsString()
    @ApiProperty({
        type: String,
        description: "product description",
    })
    description: string;

    @IsNumber()
    @Min(0)
    @Max(1000000)
    @ApiProperty({
        type: String,
        description: "product price. Min value 0. Max Value 1000000",
    })
    price: number;

    @IsNumber()
    @Min(0)
    @Max(1000000)
    @ApiProperty({
        type: String,
        description: "product quantity. Min value 0. Max Value 1000000",
    })
    qty: number;
}
