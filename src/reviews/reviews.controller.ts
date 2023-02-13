import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    NotFoundException,
    UnauthorizedException,
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
    findAll(@Param("productId") productId: string) {
        return this.reviewsService.findAll(+productId);
    }

    @Get("/:reviewId")
    @ApiOperation({
        summary: "Route for fetching single review by id",
    })
    @ApiParam({
        name: "reviewId",
        type: "number",
    })
    async findOne(@Param("reviewId") reviewId: string) {
        const review = await this.reviewsService.findOne(+reviewId);
        if (!review) {
            throw new NotFoundException("Review not found");
        }
        return review;
    }

    @Patch("/:reviewId")
    @UseGuards(AuthGuard)
    @ApiOperation({
        summary: "Route for updating a single review by id",
    })
    @ApiParam({
        name: "reviewId",
        type: "number",
    })
    async update(
        @Param("reviewId") reviewId: string,
        @Body() updateReviewDto: UpdateReviewDto,
        @CurrentUser() user: User
    ) {
        const review = await this.reviewsService.findOne(+reviewId);
        if (!review) {
            throw new NotFoundException("Review not found");
        }
        if (review.user.id !== user.id) {
            throw new UnauthorizedException("Not authorized!");
        }
        return this.reviewsService.update(review, updateReviewDto);
    }

    @Delete("/:reviewId")
    @UseGuards(AuthGuard)
    @ApiOperation({
        summary: "Route for deleting a single review by id",
    })
    @ApiParam({
        name: "reviewId",
        type: "number",
    })
    async remove(
        @Param("reviewId") reviewId: string,
        @CurrentUser() user: User
    ) {
        const review = await this.reviewsService.findOne(+reviewId);
        if (!review) {
            throw new NotFoundException("Review not found");
        }
        if (review.user.id !== user.id) {
            throw new UnauthorizedException("Not authorized!");
        }
        return this.reviewsService.remove(review);
    }
}
