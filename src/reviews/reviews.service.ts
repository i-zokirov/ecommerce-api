import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UpdateReviewDto } from "./dto/update-review.dto";
import Review from "./entities/review.entity";

@Injectable()
export class ReviewsService {
    constructor(
        @InjectRepository(Review) private readonly repostory: Repository<Review>
    ) {}
    create(review: Partial<Review>) {
        const created = this.repostory.create(review);
        return this.repostory.save(created);
    }

    findAll(productId: number) {
        return this.repostory.find({
            where: { product: { id: productId } },
            relations: { product: true, user: true },
        });
    }

    findOne(id: number) {
        return this.repostory.findOne({
            where: { id },
            relations: { product: true, user: true },
        });
    }

    update(review: Review, updateReviewDto: UpdateReviewDto) {
        Object.assign(review, updateReviewDto);
        return this.repostory.save(review);
    }

    remove(review: Review) {
        return this.repostory.remove(review);
    }
}
