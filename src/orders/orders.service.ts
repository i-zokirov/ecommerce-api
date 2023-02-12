import { Injectable } from "@nestjs/common";
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
        return `This action returns all orders`;
    }

    findOne(id: number) {
        return `This action returns a #${id} order`;
    }

    update(id: number, updateOrderDto: UpdateOrderDto) {
        return `This action updates a #${id} order`;
    }

    remove(id: number) {
        return `This action removes a #${id} order`;
    }
}
