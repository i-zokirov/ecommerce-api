import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import AuthGuard from "src/guards/auth.guard";

@Controller("products")
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Post("/admin")
    @UseGuards(AuthGuard)
    create(@Body() createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto);
    }

    @Get()
    findAll() {
        return this.productsService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.productsService.findOne(+id);
    }

    @Patch("/:id/admin")
    @UseGuards(AuthGuard)
    update(
        @Param("id") id: string,
        @Body() updateProductDto: UpdateProductDto
    ) {
        return this.productsService.update(+id, updateProductDto);
    }

    @Delete("/:id/admin")
    @UseGuards(AuthGuard)
    remove(@Param("id") id: string) {
        return this.productsService.remove(+id);
    }
}
