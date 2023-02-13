import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    AfterInsert,
    AfterUpdate,
    AfterRemove,
    UpdateDateColumn,
    CreateDateColumn,
    ManyToOne,
} from "typeorm";
import User from "../../users/entities/user.entity";
import Product from "../../products/entities/product.entity";

@Entity()
export default class Review {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rating: number;

    @Column()
    comment: string;

    @ManyToOne(() => Product, (product) => product.reviews, {
        onDelete: "CASCADE",
    })
    product: Product;

    @ManyToOne(() => User, (user) => user.reviews, {
        onDelete: "CASCADE",
    })
    user: User;

    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;

    @AfterInsert()
    logInsert() {
        console.log(`Inserted Review with an ID: ${this.id}`);
    }

    @AfterUpdate()
    logUpdate() {
        console.log(`Update Review with an ID: ${this.id}`);
    }

    @AfterRemove()
    logRemove() {
        console.log(`Remove Review with an ID: ${this.id}`);
    }
}
