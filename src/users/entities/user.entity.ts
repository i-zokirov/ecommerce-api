import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    AfterInsert,
    AfterUpdate,
    AfterRemove,
    UpdateDateColumn,
    CreateDateColumn,
    OneToMany,
} from "typeorm";
import Order from "../../orders/entities/order.entity";
import Review from "../../reviews/entities/review.entity";

export enum UserRole {
    Admin = "Admin",
    User = "User",
}

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column()
    firstname: string;
    @Column()
    lastname: string;
    @Column({ default: UserRole.User })
    role: string;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];
    @OneToMany(() => Review, (review) => review.user)
    reviews: Review[];
    @AfterInsert()
    logInsert() {
        console.log(`Inserted User with an ID: ${this.id}`);
    }

    @AfterUpdate()
    logUpdate() {
        console.log(`Update User with an ID: ${this.id}`);
    }

    @AfterRemove()
    logRemove() {
        console.log(`Remove User with an ID: ${this.id}`);
    }
}
