import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsGuard } from 'src/auth/ws.guard';
import { JoinRoomDto } from './dto/joinRoom.dto';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MyGetway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(private jwtService: JwtService) {}
  
  private rooms = [
    { id: 1, isUser: true, users: [1, 2], message: [], name: undefined },
    { id: 1, isUser: true, users: [1, 2], message: [], name: '' },
  ];
  private users = [
    { id: 1, name: 'taha' },
    { id: 2, name: 'akbar' },
  ];
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    const token = client.handshake.auth?.token || client.handshake.headers['authorization'];

    if (!token || !token.startsWith('Bearer ')) {
      client.disconnect();
      return;
    }

    try {
      const realToken = token.split(' ')[1];
      const payload = this.jwtService.verify(realToken,{secret:"123"}); 
      client.data.user = payload; 

      console.log("user connected", client.data.user);
    } catch (error) {
      console.log("error auth:", error.message);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {}

  @UseGuards(WsGuard)
  @SubscribeMessage('myRooms')
  onJoin(@ConnectedSocket() client: Socket) {
    const userId = client.data.user.id;
    let rooms = this.rooms.filter((el) => el.users.find((e) => e == userId));
    let convertedRooms = rooms.map((el) => {
      let payload = { roomId: el.id, isUser: el.isUser, name: el?.name };
      if (el.isUser) {
        const roomUserId = el.users.find((el) => el != userId);
        const roomUser = this.users.find((el) => el.id == roomUserId);
        payload['name'] = roomUser?.name;
      }
      return payload;
    });
    client.emit('myRoomsList', convertedRooms);
  }

  @SubscribeMessage('message')
  onSendMessage(
    @MessageBody() data: { roomId: string; text: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(data.roomId, typeof data.roomId);

    this.server.in(data.roomId).emit('joined', 'message');
  }
  @SubscribeMessage('leave')
  onLeave(@MessageBody() roomId: any, @ConnectedSocket() client: Socket) {
    const safeRoomId = roomId.toString();

    client.leave(safeRoomId); // از اتاق خارج می‌شه

    // به بقیه تو اتاق بگو که یکی رفت (اختیاری)
    this.server.in(safeRoomId).emit('left', {
      message: 'کاربری از اتاق خارج شد',
      userId: client.data.user.sub,
    });
  }


}
