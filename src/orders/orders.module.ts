import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";
import Order from "./entities/order.entity";
import OrderItem from "./entities/order-item.entity";
import OrderItemService from "./order-item.service";
import { ProductsModule } from "../products/products.module";

@Module({
    imports: [TypeOrmModule.forFeature([Order, OrderItem]), ProductsModule],
    controllers: [OrdersController],
    providers: [OrdersService, OrderItemService],
})
export class OrdersModule {}
