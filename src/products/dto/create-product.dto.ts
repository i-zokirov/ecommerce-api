import { IsUrl, IsString, IsNumber, Min, Max } from "class-validator";
export class CreateProductDto {
    @IsString()
    name: string;
    @IsUrl()
    image: string;
    @IsString()
    description: string;
    @IsNumber()
    @Min(0)
    @Max(1000000)
    price: number;
}
