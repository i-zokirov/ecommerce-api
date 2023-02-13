import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateOrderDto } from "./dto/update-order.dto";
import Order from "./entities/order.entity";

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order) private readonly repository: Repository<Order>
    ) {}
    create(orderAttr: Partial<Order>) {
        const order = this.repository.create(orderAttr);
        return this.repository.save(order);
    }

    findAll() {
        return this.repository.find({
            relations: { order_items: { product: true }, user: true },
        });
    }

    findUserOrders(userId: number) {
        return this.repository.find({
            where: { user: { id: userId } },
            relations: { order_items: { product: true }, user: true },
        });
    }

    findOne(id: number) {
        return this.repository.findOne({
            where: { id },
            relations: { order_items: { product: true }, user: true },
        });
    }

    async update(id: number, orderAttr: Partial<Order>) {
        const order = await this.findOne(id);
        if (!order) {
            throw new NotFoundException("Order not found!");
        }
        Object.assign(order, orderAttr);
        return this.repository.save(order);
    }

    remove(order: Order) {
        return this.repository.remove(order);
    }
}
