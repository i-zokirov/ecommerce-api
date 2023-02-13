import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    UseGuards,
    NotFoundException,
    BadRequestException,
    UnauthorizedException,
} from "@nestjs/common";
import { ApiOperation, ApiParam } from "@nestjs/swagger";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import AuthGuard from "../guards/auth.guard";
import CurrentUser from "../users/decorators/current-user.decorator";
import User, { UserRole } from "../users/entities/user.entity";
import { ProductsService } from "../products/products.service";
import OrderItemService from "./order-item.service";
import Order, { OrderStatus } from "./entities/order.entity";
import OrderDto from "./dto/order.dto";
import Serialize from "../interceptors/serialize.interceptor";
import AdminGuard from "../guards/admin.guard";

@Controller("orders")
@Serialize(OrderDto)
export class OrdersController {
    constructor(
        private readonly ordersService: OrdersService,
        private readonly orderItemService: OrderItemService,
        private readonly productsService: ProductsService
    ) {}

    @Post()
    @UseGuards(AuthGuard)
    @ApiOperation({
        summary: "Route for created an order for authenticated user.",
    })
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

    @Get("/")
    @UseGuards(AuthGuard)
    @ApiOperation({
        summary: "Route for fetching all orders of the authenticated user.",
    })
    findUserOrders(@CurrentUser() user: User) {
        return this.ordersService.findUserOrders(user.id);
    }

    @Get("/admin")
    @UseGuards(AdminGuard)
    @ApiOperation({
        summary: "Route for fetching all orders for the admin.",
    })
    findAll() {
        return this.ordersService.findAll();
    }

    @Get(":id")
    @UseGuards(AuthGuard)
    @ApiOperation({
        summary:
            "Route for fetching an order by :id param if the order belongs to the authenticated user.",
    })
    @ApiParam({ name: "id", type: "number" })
    async findOne(@Param("id") id: string, @CurrentUser() user: User) {
        const order = await this.ordersService.findOne(+id);
        if (!order) {
            throw new NotFoundException("Order not found!");
        }

        if (order.user.id !== user.id) {
            throw new UnauthorizedException("Not authorized!");
        }

        return order;
    }

    @Get("/:id/admin")
    @UseGuards(AdminGuard)
    @ApiOperation({
        summary: "Route for fetching an order by :id param for the admin user.",
    })
    @ApiParam({ name: "id", type: "number" })
    findOneForAdmin(@Param("id") id: string) {
        return this.ordersService.findOne(+id);
    }

    @Patch("/:id")
    @UseGuards(AuthGuard)
    @ApiOperation({
        summary:
            "Route for updating an order by :id param if the order belongs to the authenticated user.",
    })
    @ApiParam({ name: "id", type: "number" })
    async update(
        @Param("id") id: string,
        @Body() updateOrderDto: UpdateOrderDto,
        @CurrentUser() user: User
    ) {
        const order = await this.ordersService.findOne(+id);
        if (!order) {
            throw new NotFoundException("Order not found!");
        }

        if (order.user.id !== user.id) {
            throw new UnauthorizedException("Not authorized!");
        }

        const updates: Partial<Order> = { ...updateOrderDto };
        if (updates.status === OrderStatus.Cancelled) {
            updates.cancelledBy = UserRole.User;
        }
        return this.ordersService.update(+id, updates);
    }

    @Patch("/:id/admin")
    @UseGuards(AdminGuard)
    @ApiOperation({
        summary: "Route for updating an order by :id param for the admin user.",
    })
    @ApiParam({ name: "id", type: "number" })
    async updateByAdmin(
        @Param("id") id: string,
        @Body() updateOrderDto: UpdateOrderDto
    ) {
        const order = await this.ordersService.findOne(+id);
        if (!order) {
            throw new NotFoundException("Order not found!");
        }
        const updates: Partial<Order> = { ...updateOrderDto };
        if (updates.status === OrderStatus.Cancelled) {
            updates.cancelledBy = UserRole.Admin;
        }
        return this.ordersService.update(+id, updates);
    }
}
