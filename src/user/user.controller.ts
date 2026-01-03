import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}
  @Get('all')
  all() {
    return this.userService.findAll();
  }
  @Post('create')
  create(@Body() createDto: CreateUserDto) {
    return this.userService.create(createDto);
  }
}
