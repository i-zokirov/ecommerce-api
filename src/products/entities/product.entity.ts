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
import Review from "../../reviews/entities/review.entity";

@Entity()
export default class Product {
    @PrimaryGeneratedColumn()
    id: number;
    @OneToMany(() => Review, (review) => review.product)
    reviews: Review[];
    @Column()
    name: string;
    @Column()
    image: string;
    @Column()
    description: string;
    @Column()
    price: number;
    @Column({ default: 0 })
    qty: number;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
    @AfterInsert()
    logInsert() {
        console.log(`Inserted Product with an ID: ${this.id}`);
    }

    @AfterUpdate()
    logUpdate() {
        console.log(`Update Product with an ID: ${this.id}`);
    }

    @AfterRemove()
    logRemove() {
        console.log(`Remove Product with an ID: ${this.id}`);
    }
}
