import { Module, ValidationPipe } from "@nestjs/common";
import { APP_PIPE } from "@nestjs/core";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProductsModule } from "./products/products.module";
import { OrdersModule } from "./orders/orders.module";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import Product from "./products/entities/product.entity";
import User from "./users/entities/user.entity";
import Order from "./orders/entities/order.entity";
import OrderItem from "./orders/entities/order-item.entity";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "sqlite",
            database: "db.sqlite",
            entities: [Product, User, Order, OrderItem],
            synchronize: true,
        }),
        ProductsModule,
        OrdersModule,
        UsersModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_PIPE,
            useValue: new ValidationPipe({
                whitelist: true,
            }),
        },
    ],
})
export class AppModule {}
