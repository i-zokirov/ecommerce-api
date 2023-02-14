import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";
import User from "./users/entities/user.entity";
import Order from "./orders/entities/order.entity";
import Product from "./products/entities/product.entity";
import OrderItem from "./orders/entities/order-item.entity";
import Review from "./reviews/entities/review.entity";
dotenv.config({ path: ".env.production" });

const AppDataSource = new DataSource({
    type: "sqlite",
    database: "db.sqlite",
    // url: process.env.DATABASE_URL,
    // username: process.env.DB_USERNAME,
    // password: process.env.DB_PASSWORD,
    // host: process.env.DB_HOSTNAME,
    // database: process.env.DB_NAME,
    // port: parseInt(process.env.DB_PORT),
    // ssl: {
    //     rejectUnauthorized: false,
    // },
    synchronize: false,
    // autoLoadEntities: true,
    entities: [User, Order, Product, OrderItem, Review],
    migrations: ["./src/migrations/*.ts"],
} as DataSourceOptions);

export default AppDataSource;
