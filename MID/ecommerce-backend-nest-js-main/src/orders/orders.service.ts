// import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrdersProductsEntity } from './entities/orders_products.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { ShippingEntity } from './entities/shipping.entity';
// import { ProductEntity } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';
import { orderStatus } from './enums/order_status.enum';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrdersProductsEntity)
    private readonly opRepository: Repository<OrdersProductsEntity>,
    private readonly productsService: ProductsService, // Fixed injection
  ) {}

  async create(createOrderDto: CreateOrderDto, currentUser: UserEntity) {
    // Create shipping address
    const shippingEntity = new ShippingEntity();
    Object.assign(shippingEntity, createOrderDto.shippingAddress);

    // Create order entity
    const orderEntity = new OrderEntity();
    orderEntity.shippingAddress = shippingEntity;
    orderEntity.user = currentUser;

    const savedOrder = await this.orderRepository.save(orderEntity);

    // Map and fetch products for the order
    const opEntities = await Promise.all(
      createOrderDto.orderedProducts.map(async (orderedProduct) => {
        const product = await this.productsService.findOne(orderedProduct.id);
        if (!product) {
          throw new NotFoundException(
            `Product with ID ${orderedProduct.id} not found`,
          );
        }

        return {
          order: savedOrder,
          product,
          product_quantity: orderedProduct.product_quantity,
          product_unit_price: orderedProduct.product_unit_price,
        };
      }),
    );

    // Save order products
    await this.opRepository.save(opEntities);

    // Return the saved order with details
    return await this.findOne(savedOrder.id);
  }

  async findAll() {
    return await this.orderRepository.find({
      relations: {
        shippingAddress: true,
        user: true,
        products: {
          product: true,
        },
      },
    });
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: {
        shippingAddress: true,
        user: true,
        products: {
          product: true,
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  async update(
    id: number,
    UpdateOrderStatusDto: UpdateOrderStatusDto,
    currentUser: UserEntity,
  ) {
    let order = await this.findOne(id);
    if (!order) throw new NotFoundException('Order Id Not Found');
    if (
      order.status === orderStatus.DELIVERED ||
      order.status === orderStatus.CANCELLED
    ) {
      throw new BadRequestException(`Order already ${order.status}`);
    }

    if (
      order.status === orderStatus.PROCESSING &&
      UpdateOrderStatusDto.status !== orderStatus.SHIPPED
    ) {
      throw new BadRequestException('Delivery before shipped is not allowed!');
    }

    if (
      UpdateOrderStatusDto.status === orderStatus.SHIPPED &&
      order.status === orderStatus.SHIPPED
    ) {
      return order;
    }

    if (UpdateOrderStatusDto.status === orderStatus.SHIPPED) {
      order.shipped_at = new Date();
    }

    if (UpdateOrderStatusDto.status === orderStatus.DELIVERED) {
      order.delivered_at = new Date();
    }
    order.status = UpdateOrderStatusDto.status;
    order.updated_by = currentUser;
    order = await this.orderRepository.save(order);
    if (UpdateOrderStatusDto.status === orderStatus.DELIVERED) {
      await this.stockUpdate(order, orderStatus.DELIVERED);
    }
    // Object.assign(order, UpdateOrderStatusDto);
    return order;
  }

  async remove(id: number) {
    const order = await this.findOne(id);
    await this.orderRepository.remove(order);
    return { message: `Order with ID ${id} has been removed` };
  }
  async cancelled(id: number, currentUser: UserEntity) {
    let order = await this.findOne(id);
    if (!order) throw new NotFoundException('Order Not Found.');

    if (order.status == orderStatus.CANCELLED) return order;

    order.status = orderStatus.CANCELLED;
    order.updated_by = currentUser;
    order = await this.orderRepository.save(order);
    await this.stockUpdate(order, orderStatus.CANCELLED);
    return order;
  }

  async stockUpdate(order: OrderEntity, status: string) {
    for (const op of order.products) {
      await this.productsService.updateStock(
        op.product.product_id,
        op.product_quantity,
        status,
      );
    }
  }
}
