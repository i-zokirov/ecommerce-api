import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    NotFoundException,
    BadRequestException,
} from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import AuthGuard from "../guards/auth.guard";
import CurrentUser from "../users/decorators/current-user.decorator";
import User from "../users/entities/user.entity";
import { ProductsService } from "../products/products.service";
import OrderItemService from "./order-item.service";
import Order from "./entities/order.entity";

@Controller("orders")
export class OrdersController {
    constructor(
        private readonly ordersService: OrdersService,
        private readonly orderItemService: OrderItemService,
        private readonly productsService: ProductsService
    ) {}

    @Post()
    @UseGuards(AuthGuard)
    // @Serialize(UserPublicDto)
    async create(
        @Body() createOrderDto: CreateOrderDto,
        @CurrentUser() user: User
    ) {
        if (!createOrderDto.orderitems || !createOrderDto.orderitems.length) {
            throw new BadRequestException();
        }
        const orderItems = await Promise.all(
            createOrderDto.orderitems.map(async (item) => {
                const product = await this.productsService.findOne(
                    +item.productId
                );
                if (!product) {
                    throw new NotFoundException("Product not found");
                }

                const orderItem = await this.orderItemService.create({
                    name: product.name,
                    qty: item.qty,
                    product: product,
                    image: product.image,
                    price: product.price,
                });
                return orderItem;
            })
        );
        if (!orderItems.length) {
            throw new BadRequestException();
        }
        const order: Partial<Order> = {
            order_items: orderItems,
            paymentMethod: createOrderDto.paymentMethod,
            user,
            shippingPrice: 0,
            taxPrice: 0,
            shipping_street: createOrderDto.shippingAddress.street,
            shipping_postalCode: createOrderDto.shippingAddress.postalCode,
            shipping_city: createOrderDto.shippingAddress.city,
            shipping_country: createOrderDto.shippingAddress.country,
        };
        order.totalPrice =
            order.shippingPrice +
            order.taxPrice +
            order.order_items.reduce(
                (previous, current) => previous + current.qty * current.price,
                0
            );
        return this.ordersService.create(order);
    }

    @Get()
    findAll() {
        return this.ordersService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.ordersService.findOne(+id);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateOrderDto: UpdateOrderDto) {
        return this.ordersService.update(+id, updateOrderDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.ordersService.remove(+id);
    }
}
