import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from "@nestjs/typeorm";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) {}
    createTypeOrmOptions(): TypeOrmModuleOptions {
        if (process.env.NODE_ENV === "development") {
            return {
                type: "sqlite",
                synchronize: false,
                database: "db.sqlite",
                autoLoadEntities: true,
            };
        } else if (process.env.NODE_ENV === "production") {
            return {
                type: "postgres",
                synchronize: this.configService.get<boolean>("DB_SYNCHRONIZE"),
                autoLoadEntities: true,
                url: this.configService.get<string>("DATABASE_URL"),
                username: this.configService.get<string>("DB_USERNAME"),
                password: this.configService.get<string>("DB_PASSWORD"),
                port: this.configService.get<number>("DB_PORT"),
                migrationsRun:
                    this.configService.get<boolean>("MIGRATIONS_RUN"),
                ssl: {
                    rejectUnauthorized: false,
                },
            };
        }
    }
}
