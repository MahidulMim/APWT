import { ProductsService } from './../products/products.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReivewDto } from './dto/create-reivew.dto';
import { UpdateReivewDto } from './dto/update-reivew.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReivewEntity } from './entities/reivew.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class ReivewsService {
  constructor(
    @InjectRepository(ReivewEntity)
    private readonly reivewRepo: Repository<ReivewEntity>,
    private readonly ProductsService: ProductsService,
  ) {}

  async create(
    createReivewDto: CreateReivewDto,
    currentUser: UserEntity,
  ): Promise<ReivewEntity> {
    const product = await this.ProductsService.findOne(
      createReivewDto.productId,
    );
    let review = await this.findOneByUserAndProduct(
      currentUser.user_id,
      createReivewDto.productId,
    );

    if (!review) {
      review = this.reivewRepo.create(createReivewDto);
      review.user = currentUser;
      review.product = product;
    } else {
      review.comment = createReivewDto.comment;
      review.ratings = createReivewDto.ratings;
    }

    return await this.reivewRepo.save(review);
  }

  async findAll(): Promise<ReivewEntity[]> {
    return await this.reivewRepo.find();
  }

  async findAllByProduct(id: number): Promise<ReivewEntity[]> {
    const product = await this.ProductsService.findOne(id);
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }

    return await this.reivewRepo.find({
      where: { product: { product_id: id } },
      relations: ['product'],
    });
  }

  async findOne(id: number): Promise<ReivewEntity> {
    const review = await this.reivewRepo.findOne({
      where: { id },
      relations: {
        user: true,
        product: {
          category: true,
        },
      },
    });

    if (!review) throw new NotFoundException('Review does not exist');
    return review;
  }

  async update(
    id: number,
    updateReivewDto: UpdateReivewDto,
  ): Promise<ReivewEntity> {
    const review = await this.reivewRepo.findOne({
      where: { id },
      relations: ['product', 'user'],
    });

    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    review.comment = updateReivewDto.comment || review.comment;
    review.ratings = updateReivewDto.ratings || review.ratings;

    return await this.reivewRepo.save(review);
  }

  async remove(id: number): Promise<string> {
    const review = await this.reivewRepo.findOne({
      where: { id },
      relations: ['user', 'product'],
    });

    if (!review) {
      throw new Error(`Review with ID ${id} not found`);
    }

    await this.reivewRepo.remove(review);
    return `Review with ID #${id} successfully removed`;
  }

  async findOneByUserAndProduct(userId: number, productId: number) {
    return await this.reivewRepo.findOne({
      where: {
        user: {
          user_id: userId,
        },
        product: {
          product_id: productId,
        },
      },
      relations: {
        user: true,
        product: {
          category: true,
        },
      },
    });
  }
}
