import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SignInDto } from './dto/signIn.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/createUser.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({ type: SignInDto })
  @ApiResponse({ status: 201, description: 'Login success' })
  async login(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
    @Post('register')
  @ApiOperation({ summary: 'Register user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Login success' })
  async signUp(@Body() CreateUserDto: CreateUserDto) {
    return this.authService.signUp(CreateUserDto);
  }
}
