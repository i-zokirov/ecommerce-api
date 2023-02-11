import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    AfterInsert,
    AfterUpdate,
    AfterRemove,
    UpdateDateColumn,
    CreateDateColumn,
} from "typeorm";

@Entity()
export default class Product {
    @PrimaryGeneratedColumn()
    id: number;
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
    createdAt: String;
    @UpdateDateColumn()
    updtedAt: String;
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
