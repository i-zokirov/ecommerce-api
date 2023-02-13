import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    NotFoundException,
    UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiParam } from "@nestjs/swagger";
import { ReviewsService } from "./reviews.service";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { ProductsService } from "../products/products.service";
import Review from "./entities/review.entity";
import CurrentUser from "../users/decorators/current-user.decorator";
import User from "../users/entities/user.entity";
import AuthGuard from "../guards/auth.guard";
import Serialize from "../interceptors/serialize.interceptor";
import ReviewDto from "./dto/review.dto";

@Controller("reviews")
@Serialize(ReviewDto)
export class ReviewsController {
    constructor(
        private readonly reviewsService: ReviewsService,
        private readonly productsService: ProductsService
    ) {}

    @Post("/products/:productId")
    @UseGuards(AuthGuard)
    @ApiOperation({
        summary: "Route for creating a review for the product",
    })
    async create(
        @Param("productId") productId: string,
        @Body() createReviewDto: CreateReviewDto,
        @CurrentUser() user: User
    ) {
        const product = await this.productsService.findOne(+productId);
        if (!product) {
            throw new NotFoundException("Product not found!");
        }
        const review: Partial<Review> = { ...createReviewDto };
        review.product = product;
        review.user = user;
        return this.reviewsService.create(review);
    }

    @Get("/products/:productId")
    @ApiOperation({
        summary: "Route for fetching reviews of a product",
    })
    @ApiParam({
        name: "productId",
        type: "number",
    })
    findAll() {
        return this.reviewsService.findAll();
    }

    @Get("/:reviewId")
    @ApiOperation({
        summary: "Route for fetching single review by id",
    })
    @ApiParam({
        name: "reviewId",
        type: "number",
    })
    findOne(@Param("reviewId") reviewId: string) {
        return this.reviewsService.findOne(+reviewId);
    }

    @Patch("/:reviewId")
    @ApiOperation({
        summary: "Route for updating a single review by id",
    })
    @ApiParam({
        name: "reviewId",
        type: "number",
    })
    update(
        @Param("reviewId") reviewId: string,
        @Body() updateReviewDto: UpdateReviewDto
    ) {
        return this.reviewsService.update(+reviewId, updateReviewDto);
    }

    @Delete("/:reviewId")
    @ApiOperation({
        summary: "Route for deleting a single review by id",
    })
    @ApiParam({
        name: "reviewId",
        type: "number",
    })
    remove(@Param("reviewId") reviewId: string) {
        return this.reviewsService.remove(+reviewId);
    }
}
