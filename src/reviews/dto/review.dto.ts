import { Expose, Transform } from "class-transformer";

export default class ReviewDto {
    @Expose()
    id: number;
    @Expose()
    rating: number;
    @Expose()
    comment: string;
    @Expose()
    @Transform(({ obj }) => (obj.product.id ? obj.product.id : null))
    product: number;
    @Expose()
    @Transform(({ obj }) =>
        obj.user.id
            ? {
                  id: obj.user.id,
                  firstname: obj.user.firstname,
                  lastname: obj.user.lastname,
              }
            : null
    )
    user: number;
    @Expose()
    createdAt: Date;
    @Expose()
    updatedAt: Date;
}
