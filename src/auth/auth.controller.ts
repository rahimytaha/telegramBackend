import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SignInDto } from './dto/signIn.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { PublicRoute } from './authPublic.decorator';
@PublicRoute()
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({ type: SignInDto })
  @ApiResponse({
    type: () => ResponseDto<{ token: string }>,
    status: 201,
    description: 'Login success',
  })
  async login(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
  @Post('register')
  @ApiOperation({ summary: 'Register user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    type: () => ResponseDto<{ token: string }>,
    status: 201,
    description: 'Register success',
  })
  async signUp(@Body() CreateUserDto: CreateUserDto) {
    return this.authService.signUp(CreateUserDto);
  }
}
