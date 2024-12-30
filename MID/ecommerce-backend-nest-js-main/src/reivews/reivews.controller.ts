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
import { ReivewsService } from './reivews.service';

import { UpdateReivewDto } from './dto/update-reivew.dto';
import { CreateReivewDto } from './dto/create-reivew.dto';
import { AuthenticationGuard } from 'src/utility/Guards/authentication.guard';
import { CurrentUser } from 'src/utility/decorators/current_user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { ReivewEntity } from './entities/reivew.entity';
import { AuthorizeRoles } from 'src/utility/decorators/authorize-roles.decorator';
import { AuthorizeGuard } from 'src/utility/Guards/authorization.guard';
import { Roles } from 'src/utility/common/user_roles_enum';

@Controller('reivews') // Keeping the typo in route
export class ReivewsController {
  constructor(private readonly reivewsService: ReivewsService) {}

  @UseGuards(AuthenticationGuard)
  @Post()
  async create(
    @Body() createReivewDto: CreateReivewDto,
    @CurrentUser() currentUser: UserEntity,
  ): Promise<ReivewEntity> {
    return this.reivewsService.create(createReivewDto, currentUser);
  }

  @UseGuards(AuthenticationGuard)
  @Get('/all')
  async findAll() {
    return await this.reivewsService.findAll();
  }

  @UseGuards(AuthenticationGuard)
  @Get('/productsReview/:productId') // Corrected to use Param decorator
  async findAllByProduct(@Param('productId') productId: number) {
    // Corrected to use Param decorator
    return await this.reivewsService.findAllByProduct(+productId);
  }

  @UseGuards(AuthenticationGuard)
  @Get('/getAReview/:id')
  async findOne(@Param('id') id: string) {
    return await this.reivewsService.findOne(+id);
  }
  @UseGuards(AuthenticationGuard)
  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateReivewDto: UpdateReivewDto,
  ) {
    return this.reivewsService.update(+id, updateReivewDto);
  }

  @AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.reivewsService.remove(+id);
  }
}
