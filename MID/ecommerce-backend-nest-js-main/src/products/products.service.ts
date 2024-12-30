import { CurrentUser } from 'src/utility/decorators/current_user.decorator';
import { ProductEntity } from './entities/product.entity';
// import { ProductEntity } from 'src/products/entities/product.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { orderStatus } from 'src/orders/enums/order_status.enum';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,
    private readonly categoryService: CategoriesService,
  ) {}
  async create(
    createProductDto: CreateProductDto,
    currentUser,
  ): Promise<ProductEntity> {
    const category = await this.categoryService.findOne(
      +createProductDto.categoryId,
    );
    const product = this.productRepo.create(createProductDto);
    product.category = category;
    product.addedBy = currentUser;
    return await this.productRepo.save(product);
  }

  async findAll(): Promise<ProductEntity[]> {
    return await this.productRepo.find();
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({
      where: { product_id: id },
      relations: {
        addedBy: true,
        category: true,
      },
    });
    if (!product) throw new NotFoundException('Product Not Found');
    return product;
  }

  async update(
    product_id: number,
    updateProductDto: Partial<UpdateProductDto>,
    currentUser: UserEntity,
  ): Promise<ProductEntity> {
    const product = await this.findOne(product_id);
    Object.assign(product, updateProductDto);
    product.addedBy = currentUser;

    if (updateProductDto.categoryId) {
      const category = await this.categoryService.findOne(
        +updateProductDto.categoryId,
      );
      product.category = category;
    }
    return await this.productRepo.save(product);
  }

  async remove(id: number): Promise<string> {
    const product = await this.productRepo.findOne({
      where: { product_id: id },
    });

    if (!product) {
      return `This action could not find a product with ID #${id}`;
    }

    await this.productRepo.remove(product);
    return `This action removes a #${id} product`;
  }
  async updateStock(id: number, stock: number, status: string) {
    let product = await this.findOne(id);

    if (status === orderStatus.DELIVERED) {
      product.stock = parseInt(product.stock.toString(), 10) - stock;
    } else {
      product.stock = parseInt(product.stock.toString(), 10) + stock;
    }

    product = await this.productRepo.save(product);
    return product;
  }
}
