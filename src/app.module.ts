import { MiddlewareConsumer, Module, ValidationPipe } from "@nestjs/common";
import { APP_PIPE } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProductsModule } from "./products/products.module";
import { OrdersModule } from "./orders/orders.module";
import { UsersModule } from "./users/users.module";
import Product from "./products/entities/product.entity";
import User from "./users/entities/user.entity";
import Order from "./orders/entities/order.entity";
import OrderItem from "./orders/entities/order-item.entity";
const cookieSession = require("cookie-session");

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV}`,
        }),
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
export class AppModule {
    constructor(private readonly configService: ConfigService) {}
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(
                cookieSession({
                    keys: [this.configService.get<string>("COOKIE_KEY")],
                })
            )
            .forRoutes("*");
    }
}
