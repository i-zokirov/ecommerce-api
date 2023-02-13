import { IsString, IsNumber, Min, Max, IsOptional } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateReviewDto {
    @IsNumber()
    @Min(1)
    @Max(5)
    @ApiProperty({
        type: Number,
        description: "product rating",
        example: 5,
    })
    rating: number;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        type: String,
        description: "review comment",
        example: "This is amazing",
    })
    comment: string;
}
