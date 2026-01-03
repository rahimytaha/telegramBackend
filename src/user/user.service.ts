import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async findAll() {
    const data = await this.userRepository.find();
    return data;
  }
  async findBy(
    email?: string,
    username?: string,
    shouldExist: boolean = true,
  ): Promise<UserEntity | undefined> {
    const user = await this.userRepository.findOneBy({ email, username });
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
