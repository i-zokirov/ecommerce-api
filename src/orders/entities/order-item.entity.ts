import Product from "src/products/entities/product.entity";
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";

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
    @Column({ default: 0 })
    qty: number;
    @ManyToOne(() => Product)
    product: Product;
}
