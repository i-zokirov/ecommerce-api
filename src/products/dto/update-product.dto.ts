import {
    IsUrl,
    IsString,
    IsNumber,
    Min,
    Max,
    IsOptional,
} from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateProductDto {
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        type: String,
        description: "product title",
        example: "iPhone 13 Pro Max",
    })
    name: string;

    @IsUrl()
    @IsOptional()
    @ApiPropertyOptional({
        type: String,
        description: "product image url",
        example: "https://www.apple.com/iphone-13-pro-max/design/",
    })
    image: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        type: String,
        description: "product description",
        example:
            "The iPhone 13 Pro Max is the latest and largest smartphone from Apple, featuring a stunning Super Retina XDR display, A15 Bionic chip, improved cameras, and longer battery life.",
    })
    description: string;

    @IsNumber()
    @IsOptional()
    @Min(0)
    @Max(1000000)
    @ApiPropertyOptional({
        type: Number,
        description: "product price. Min value 0. Max Value 1000000",
        example: 1099,
    })
    price: number;

    @IsNumber()
    @IsOptional()
    @Min(0)
    @Max(1000000)
    @ApiPropertyOptional({
        type: Number,
        description: "product quantity. Min value 0. Max Value 1000000",
        example: 11,
    })
    qty: number;
}
