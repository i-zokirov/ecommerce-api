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
    })
    name: string;

    @IsUrl()
    @IsOptional()
    @ApiPropertyOptional({
        type: String,
        description: "product image url",
    })
    image: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        type: String,
        description: "product description",
    })
    description: string;

    @IsNumber()
    @IsOptional()
    @Min(0)
    @Max(1000000)
    @ApiPropertyOptional({
        type: String,
        description: "product price. Min value 0. Max Value 1000000",
    })
    price: number;

    @IsNumber()
    @IsOptional()
    @Min(0)
    @Max(1000000)
    @ApiPropertyOptional({
        type: String,
        description: "product quantity. Min value 0. Max Value 1000000",
    })
    qty: number;
}
