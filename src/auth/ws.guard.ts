import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const client: Socket = context.switchToWs().getClient<Socket>();

    const token =
      client.handshake.auth?.token || client.handshake.headers['authorization'];
    console.log(token);
    if (!token || !token.startsWith('Bearer ')) {
      client.disconnect();
      return false;
    }

    try {
      const realToken = token.split(' ')[1];
      const payload = this.jwtService.verify(realToken,{secret:"123"});
      client.data.user = payload;
      return true;
    } catch (error) {
        console.log(error)
      client.disconnect();
      return false;
    }
  }
}
