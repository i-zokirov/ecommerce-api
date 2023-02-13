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
import { ApiOperation, ApiParam } from "@nestjs/swagger";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import AuthGuard from "../guards/auth.guard";

@Controller("products")
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Post("/admin")
    @UseGuards(AuthGuard)
    @ApiOperation({
        summary: "Route for creating a product for admin",
    })
    create(@Body() createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto);
    }

    @Get()
    @ApiOperation({
        summary: "Gets all products.",
    })
    findAll() {
        return this.productsService.findAll();
    }

    @Get(":id")
    @ApiOperation({
        summary: "Gets a product by id param.",
    })
    @ApiParam({ name: "id", type: "number" })
    findOne(@Param("id") id: string) {
        return this.productsService.findOne(+id);
    }

    @Patch("/:id/admin")
    @UseGuards(AuthGuard)
    @ApiOperation({
        summary: "Updates a product by id param for admin.",
    })
    @ApiParam({ name: "id", type: "number" })
    update(
        @Param("id") id: string,
        @Body() updateProductDto: UpdateProductDto
    ) {
        return this.productsService.update(+id, updateProductDto);
    }

    @Delete("/:id/admin")
    @UseGuards(AuthGuard)
    @ApiOperation({
        summary: "Deletes a product by id param for admin.",
    })
    @ApiParam({ name: "id", type: "number" })
    remove(@Param("id") id: string) {
        return this.productsService.remove(+id);
    }
}
