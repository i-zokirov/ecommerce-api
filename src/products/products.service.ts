import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import Product from "./entities/product.entity";

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product) private repository: Repository<Product>
    ) {}
    create(createProductDto: CreateProductDto) {
        const product = this.repository.create(createProductDto);
        return this.repository.save(product);
    }

    findAll() {
        return this.repository.find();
    }

    async findOne(id: number) {
        const product = await this.repository.findOne({ where: { id } });
        if (!product) {
            throw new NotFoundException("Product not found");
        }
        return product;
    }

    async update(id: number, updateProductDto: UpdateProductDto) {
        const product = await this.findOne(id);
        if (!product) {
            throw new NotFoundException("Product not found");
        }
        Object.assign(product, updateProductDto);
        return this.repository.save(product);
    }

    async remove(id: number) {
        const product = await this.findOne(id);
        if (!product) {
            throw new NotFoundException("Product not found");
        }
        return this.repository.remove(product);
    }
}
