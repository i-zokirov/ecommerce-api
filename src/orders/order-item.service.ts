import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import OrderItem from "./entities/order-item.entity";
import CreateOrderItemDto from "./dto/create-order-item.dto";

@Injectable()
export default class OrderItemService {
    constructor(
        @InjectRepository(OrderItem) private repository: Repository<OrderItem>
    ) {}

    create(createOrderItemDto: CreateOrderItemDto) {
        const orderItem = this.repository.create(createOrderItemDto);
        return this.repository.save(orderItem);
    }
}
