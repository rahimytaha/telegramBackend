import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SignInDto } from './dto/signIn.dto';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}
  async signIn(data: SignInDto): Promise<{ token: string }> {
    const existUser = await this.userService.findBy(
      undefined,
      data.username,
      true,
      true,
    );
    if (!existUser) throw new NotFoundException('user could not found');
    if (existUser.password !== data.password)
      throw new BadRequestException('password is wrong');
    return { token: this.jwtService.sign({ id: existUser.id}) };
  }
  async signUp(data: CreateUserDto): Promise<{ token: string }> {
    await this.userService.findBy(undefined, data.username, false);
    await this.userService.findBy(data.email, undefined, false);
    const newUser = await this.userService.create(data);
    return { token: this.jwtService.sign({ id: newUser }) };
  }
}
