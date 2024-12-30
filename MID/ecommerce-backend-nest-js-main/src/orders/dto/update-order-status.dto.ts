import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { orderStatus } from '../enums/order_status.enum';

export class UpdateOrderStatusDto {
  @IsNotEmpty()
  @IsString()
  @IsIn([orderStatus.SHIPPED, orderStatus.DELIVERED])
  status: orderStatus;
}
