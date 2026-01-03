import { Injectable } from '@nestjs/common';
import { SignInDto } from './dto/signIn.dto';
import { CreateUserDto } from 'src/user/dto/createUser.dto';

@Injectable()
export class AuthService {
    async signIn(data:SignInDto){
        
    }
    async signUp(data:CreateUserDto){}
}
