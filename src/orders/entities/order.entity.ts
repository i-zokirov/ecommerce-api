import User from "../../users/entities/user.entity";
import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    AfterInsert,
    AfterUpdate,
    AfterRemove,
    ManyToOne,
} from "typeorm";

export enum PaymentMethods {
    Online = "Online",
    Cash = "CashOnDelivery",
}

@Entity()
export default class Order {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => User, (user) => user.orders)
    user: User;
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
    @Column()
    paidOn: Date;
    @Column()
    deliveredOn: Date;
    @Column({ default: new Date() })
    placedOn: Date;
    @Column()
    shipping_street: string;
    @Column()
    shipping_city: string;
    @Column()
    shipping_postalCode: string;
    @Column()
    shipping_country: string;

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
