import Order from "src/orders/entities/order.entity";
import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    AfterInsert,
    AfterUpdate,
    AfterRemove,
    OneToMany,
} from "typeorm";
@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id: number;
    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];
}
