import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    AfterInsert,
    AfterUpdate,
    AfterRemove,
} from "typeorm";

@Entity()
export class Product {
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
