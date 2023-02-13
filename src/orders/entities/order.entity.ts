import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    AfterInsert,
    AfterUpdate,
    AfterRemove,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import OrderItem from "./order-item.entity";
import User from "../../users/entities/user.entity";

export enum PaymentMethods {
    Online = "Online",
    Cash = "CashOnDelivery",
}

export enum OrderStatus {
    Placed = "Placed",
    Delivered = "Delivered",
    Cancelled = "Cancelled",
}

@Entity()
export default class Order {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => User, (user) => user.orders, { onDelete: "CASCADE" })
    user: User;
    @OneToMany(() => OrderItem, (orderitem) => orderitem.order)
    order_items: OrderItem[];
    @Column({ default: PaymentMethods.Cash })
    paymentMethod: PaymentMethods;
    @Column({ default: 0 })
    shippingPrice: number;
    @Column({ default: 0 })
    taxPrice: number;
    @Column({ default: 0 })
    totalPrice: number;
    @Column({ default: false })
    isPaid: boolean;
    @Column({ default: false })
    isDelivered: boolean;
    @Column({ nullable: true, default: null })
    paidOn: Date | null;
    @Column({ nullable: true, default: null })
    deliveredOn: Date | null;
    @Column()
    shipping_street: string;
    @Column()
    shipping_city: string;
    @Column()
    shipping_postalCode: string;
    @Column()
    shipping_country: string;
    @Column({ default: OrderStatus.Placed })
    status: string;
    @Column({ nullable: true, default: null })
    cancelledBy: string;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;

    @AfterInsert()
    logInsert() {
        console.log(`Inserted Order with an ID: ${this.id}`);
    }

    @AfterUpdate()
    logUpdate() {
        console.log(`Update Order with an ID: ${this.id}`);
    }

    @AfterRemove()
    logRemove() {
        console.log(`Remove Order with an ID: ${this.id}`);
    }
}
