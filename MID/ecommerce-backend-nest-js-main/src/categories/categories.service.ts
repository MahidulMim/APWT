import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepo: Repository<CategoryEntity>,
  ) {}

  // Create a new category
  async create(
    createCategoryDto: CreateCategoryDto,
    currentUser: UserEntity,
  ): Promise<CategoryEntity> {
    const category = this.categoryRepo.create({
      ...createCategoryDto,
      addedBy: currentUser,
    });

    return await this.categoryRepo.save(category);
  }

  // Fetch all categories for any admin
  async findAll(): Promise<CategoryEntity[]> {
    return await this.categoryRepo.find({
      relations: ['addedBy'], // Include admin who added the category
    });
  }

  // Fetch a category by ID
  async findOne(id: number): Promise<CategoryEntity> {
    const category = await this.categoryRepo.findOne({
      where: { category_id: id },
      relations: ['addedBy'], // Include the admin who created the category
    });

    if (!category) {
      throw new Error(`Category with ID ${id} not found`);
    }

    return category;
  }

  // Update a category
  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryEntity> {
    const category = await this.categoryRepo.findOne({
      where: { category_id: id },
    });

    if (!category) {
      throw new Error(`Category with ID ${id} not found`);
    }

    Object.assign(category, updateCategoryDto);
    return await this.categoryRepo.save(category);
  }

  // Delete a category
  async remove(id: number): Promise<string> {
    const category = await this.categoryRepo.findOne({
      where: { category_id: id },
    });

    if (!category) {
      throw new Error(`Category with ID ${id} not found`);
    }

    await this.categoryRepo.remove(category);
    return 'Category successfully deleted';
  }
}
