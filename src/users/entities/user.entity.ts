import Order from "src/orders/entities/order.entity";
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
    createdAt: String;
    @UpdateDateColumn()
    updatedAt: String;
    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];
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
