import { IsUrl, IsString, IsNumber, Min, Max } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
    @IsString()
    @ApiProperty({
        type: String,
        description: "product title",
        example: "iPhone 13 Pro Max",
    })
    name: string;

    @IsUrl()
    @ApiProperty({
        type: String,
        description: "product image url",
        example: "https://www.apple.com/iphone-13-pro-max/design/",
    })
    image: string;

    @IsString()
    @ApiProperty({
        type: String,
        description: "product description",
        example:
            "The iPhone 13 Pro Max is the latest and largest smartphone from Apple, featuring a stunning Super Retina XDR display, A15 Bionic chip, improved cameras, and longer battery life.",
    })
    description: string;

    @IsNumber()
    @Min(0)
    @Max(1000000)
    @ApiProperty({
        type: Number,
        description: "product price. Min value 0. Max Value 1000000",
        example: 1099,
    })
    price: number;

    @IsNumber()
    @Min(0)
    @Max(1000000)
    @ApiProperty({
        type: Number,
        description: "product quantity. Min value 0. Max Value 1000000",
        example: 24,
    })
    qty: number;
}
