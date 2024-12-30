import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { userSignUpDto } from './dto/user_signUp.dto';
import { UserEntity } from './entities/user.entity';
import { userSignInDto } from './dto/user_signIn.dto';
import { CurrentUser } from 'src/utility/decorators/current_user.decorator';
import { AuthenticationGuard } from 'src/utility/Guards/authentication.guard';
import { AuthorizeRoles } from 'src/utility/decorators/authorize-roles.decorator';
import { Roles } from 'src/utility/common/user_roles_enum';
import { AuthorizeGuard } from 'src/utility/Guards/authorization.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signUp')
  async signUp(@Body() userSignUpDto: userSignUpDto): Promise<UserEntity> {
    return await this.usersService.signUp(userSignUpDto);
  }

  @Post('signIn')
  async signIn(@Body() userSignInDto: userSignInDto) {
    const user = await this.usersService.signIn(userSignInDto);
    const accessToken = await this.usersService.accessToken(user);

    return { accessToken, user };
  }
  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   // return this.usersService.create(createUserDto);
  //   return 'hi';
  // }
  @AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Get('getAll')
  async findAll(): Promise<UserEntity[]> {
    return await this.usersService.findAll();
  }

  @Get('/singleUser/:id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(+id);
  }

  @UseGuards(AuthenticationGuard)
  @Patch('/update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() currentUser: UserEntity,
  ) {
    return await this.usersService.update(+id, updateUserDto, currentUser);
  }
  @UseGuards(AuthenticationGuard)
  @Delete('delete/:id')
  async remove(
    @Param('id', ParseIntPipe) id: number,

    @CurrentUser() currentUser: UserEntity,
  ) {
    return await this.usersService.remove(id, currentUser);
  }

  @UseGuards(AuthenticationGuard)
  @Get('loggedInUser')
  getProfile(@CurrentUser() currentUser: UserEntity) {
    return currentUser;
  }
}
