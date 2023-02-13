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

    findAll() {
        return `This action returns all reviews`;
    }

    findOne(id: number) {
        return `This action returns a #${id} review`;
    }

    update(id: number, updateReviewDto: UpdateReviewDto) {
        return `This action updates a #${id} review`;
    }

    remove(id: number) {
        return `This action removes a #${id} review`;
    }
}
