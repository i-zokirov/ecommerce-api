import { NestFactory } from "@nestjs/core";
import {
    SwaggerModule,
    DocumentBuilder,
    SwaggerCustomOptions,
} from "@nestjs/swagger";
import { AppModule } from "./app.module";

const customOptions: SwaggerCustomOptions = {
    customSiteTitle: "eCommerce API Doc",
};
const config = new DocumentBuilder()
    .setTitle("eCommerce")
    .setDescription("eCommerce API")
    .setVersion("1.0")
    .addTag("eCommerce")
    .build();
async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document, customOptions);
    await app.listen(3000);
}
bootstrap();
