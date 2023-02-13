import Product from "../../products/entities/product.entity";
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";
import Order from "./order.entity";

@Entity()
export default class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    image: string;
    @Column()
    price: number;
    @Column({ default: 1 })
    qty: number;
    @ManyToOne(() => Product)
    product: Product;
    @ManyToOne(() => Order, (order) => order.order_items, {
        onDelete: "CASCADE",
    })
    order: Order;
}
