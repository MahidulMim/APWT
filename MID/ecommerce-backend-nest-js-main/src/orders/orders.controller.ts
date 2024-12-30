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
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
// import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthenticationGuard } from 'src/utility/Guards/authentication.guard';
import { CurrentUser } from 'src/utility/decorators/current_user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { AuthorizeRoles } from 'src/utility/decorators/authorize-roles.decorator';
import { AuthorizeGuard } from 'src/utility/Guards/authorization.guard';
import { Roles } from 'src/utility/common/user_roles_enum';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@UseGuards(AuthenticationGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @CurrentUser() currentUser: UserEntity,
  ) {
    return await this.ordersService.create(createOrderDto, currentUser);
  }

  @Get()
  async findAll() {
    return await this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }
  @AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() UpdateOrderStatusDto: UpdateOrderStatusDto,
    @CurrentUser()
    currentUser: UserEntity,
  ) {
    return this.ordersService.update(+id, UpdateOrderStatusDto, currentUser);
  }

  @Patch('cancel/:id')
  @AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  async cancelled(
    @Param('id') id: string,
    @CurrentUser() currentUser: UserEntity,
  ) {
    return await this.ordersService.cancelled(+id, currentUser);
  }
  @Delete(':id')
  @AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
