import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserEntity } from 'src/entities/user.entity';
import { AllUserQueryDto } from './dto/allUserQuery.dto';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @ApiResponse({ type: [UserEntity], status: 200 })
  @ApiOperation({ summary: 'Get all users' })
  @Get('all')
  all(@Query() query:AllUserQueryDto) {
    return this.userService.findAll(query);
  }
  @Post('create')
  create(@Body() createDto: CreateUserDto) {
    return this.userService.create(createDto);
  }
}
