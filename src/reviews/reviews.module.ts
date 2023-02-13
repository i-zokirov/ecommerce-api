import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReviewsService } from "./reviews.service";
import { ReviewsController } from "./reviews.controller";
import { ProductsModule } from "../products/products.module";
import Review from "./entities/review.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Review]), ProductsModule],
    controllers: [ReviewsController],
    providers: [ReviewsService],
})
export class ReviewsModule {}
