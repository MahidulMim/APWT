import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { userSignUpDto } from './dto/user_signUp.dto';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Roles } from 'src/utility/common/user_roles_enum';
import { userSignInDto } from './dto/user_signIn.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findUserByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }
  async accessToken(user: UserEntity): Promise<string> {
    return sign(
      { id: user.user_id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME },
    );
  }
  async signUp(userSignUpDto: userSignUpDto): Promise<UserEntity> {
    const userExist = await this.findUserByEmail(userSignUpDto.email);
    if (userExist) throw new BadRequestException('Email is not Available');

    userSignUpDto.password = await hash(userSignUpDto.password, 5);

    let user = this.usersRepository.create(userSignUpDto);
    user = await this.usersRepository.save(user);
    delete user.password;
    return user;
  }

  async signIn(userSignInDto: userSignInDto): Promise<UserEntity> {
    const userExist = await this.usersRepository
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.email=:email', { email: userSignInDto.email })
      .getOne();
    if (!userExist) throw new BadRequestException('User is not Registered');
    const matchPassword = await compare(
      userSignInDto.password,
      userExist.password,
    );
    if (!matchPassword) throw new BadRequestException('Password Mismatched');
    return userExist;
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  async findOne(user_id: number) {
    const user = await this.usersRepository.findOneBy({ user_id });
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  async update(
    user_id: number,
    updateUserDto: UpdateUserDto,
    currentUser: UserEntity,
  ): Promise<UserEntity> {
    if (user_id !== currentUser.user_id) {
      throw new BadRequestException('You can only update your own information');
    }

    const user = await this.usersRepository.findOneBy({ user_id: user_id });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, updateUserDto);

    return await this.usersRepository.save(user);
  }

  async remove(user_id: number, currentUser: UserEntity): Promise<string> {
    if (
      user_id !== currentUser.user_id &&
      !currentUser.roles.includes(Roles.ADMIN)
    ) {
      throw new BadRequestException('You can only delete your own profile');
    }

    const user = await this.usersRepository.findOneBy({ user_id: user_id });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.usersRepository.remove(user);
    return 'User successfully deleted';
  }
}
