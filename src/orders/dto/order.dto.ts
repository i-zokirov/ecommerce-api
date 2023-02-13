import { Transform, Expose } from "class-transformer";
import OrderItem from "../entities/order-item.entity";
import { PaymentMethods } from "../entities/order.entity";
export default class OrderDto {
    @Expose()
    id: number;
    @Transform(({ obj }) => obj.user.id)
    @Expose()
    user: number;
    @Expose()
    @Transform(({ obj }) =>
        obj.order_items.map((item) =>
            Object.assign(item, {
                product:
                    item.product && item.product.id
                        ? item.product.id
                        : item.product,
            })
        )
    )
    order_items: OrderItem[];
    @Expose()
    paymentMethod: PaymentMethods;
    @Expose()
    shippingPrice: number;
    @Expose()
    taxPrice: number;
    @Expose()
    totalPrice: number;
    @Expose()
    isPaid: boolean;
    @Expose()
    isDelivered: boolean;
    @Expose()
    paidOn: Date | null;
    @Expose()
    deliveredOn: Date | null;
    @Expose()
    shipping_street: string;
    @Expose()
    shipping_city: string;
    @Expose()
    shipping_postalCode: string;
    @Expose()
    shipping_country: string;
    @Expose()
    createdAt: Date;
    @Expose()
    updtedAt: Date;
    @Expose()
    status: string;
    @Expose()
    cancelledBy: string;
}
