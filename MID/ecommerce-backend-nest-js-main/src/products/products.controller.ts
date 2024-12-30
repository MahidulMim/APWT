import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthorizeRoles } from 'src/utility/decorators/authorize-roles.decorator';
import { AuthenticationGuard } from 'src/utility/Guards/authentication.guard';
import { AuthorizeGuard } from 'src/utility/Guards/authorization.guard';
import { Roles } from 'src/utility/common/user_roles_enum';
import { CurrentUser } from 'src/utility/decorators/current_user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { ProductEntity } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @CurrentUser() currentUser: UserEntity,
  ) {
    return await this.productsService.create(createProductDto, currentUser);
  }
  @UseGuards(AuthenticationGuard)
  @Get()
  async findAll(): Promise<ProductEntity[]> {
    return await this.productsService.findAll();
  }
  @UseGuards(AuthenticationGuard)
  @Get('/getAProduct/:id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }
  @AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @CurrentUser() currentUser: UserEntity,
  ): Promise<ProductEntity> {
    return this.productsService.update(+id, updateProductDto, currentUser);
  }
  @AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Delete('/delete/:id')
  async remove(@Param('id') id: string): Promise<string> {
    return await this.productsService.remove(+id);
  }
}
