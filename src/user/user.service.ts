import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { ILike, Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { AllUserQueryDto } from './dto/allUserQuery.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async findById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('user could not found');
    }
    return user;
  }
  async findAll(query: AllUserQueryDto): Promise<UserEntity[]> {
    const data = await this.userRepository.find({
      skip: (query.page - 1) * query.perPage,
      take: query.perPage * query.page,
      where: {
        username: ILike(`%${query.username}%`),
        email: ILike(`%${query.email}%`),
      },
    });
    return data;
  }
  async findBy(
    email?: string,
    username?: string,
    shouldExist: boolean = true,
    havePassword: boolean = true,
  ): Promise<UserEntity | undefined> {
    const user = await this.userRepository.findOne({
      where: { email, username },
      select: { password: havePassword },
    });
    if (shouldExist) {
      if (!user) {
        throw new NotFoundException('user could not found');
      }
    }
    if (!shouldExist) {
      if (user) {
        throw new NotFoundException('user with this info found');
      }
    }
    return user || undefined;
  }
  async create(data: CreateUserDto): Promise<number> {
    await this.findBy(data.email, data.username, false);
    const newUser = this.userRepository.create(data);
    await newUser.save();
    return newUser.id;
  }
}
