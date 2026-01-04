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
import { GetwayService } from './getway.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MyGetway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private jwtService: JwtService,
    private getwayService: GetwayService,
  ) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    const token =
      client.handshake.auth?.token || client.handshake.headers['authorization'];

    if (!token || !token.startsWith('Bearer ')) {
      client.disconnect();
      return;
    }

    try {
      const realToken = token.split(' ')[1];
      const payload = this.jwtService.verify(realToken, { secret: '123' });
      client.data.user = payload;
      const rooms = this.getwayService.roomsByUserId(payload.id);
      client.join(rooms.map((el) => el.roomId.toString()));
      console.log('user connected', client.data.user);
    } catch (error) {
      console.log('error auth:', error.message);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {}

  @UseGuards(WsGuard)
  @SubscribeMessage('myRooms')
  myRooms(@ConnectedSocket() client: Socket) {
    const userId = client.data.user.id;
    const convertedRooms = this.getwayService.roomsByUserId(userId);
    client.emit('myRoomsList', convertedRooms);
  }

  @SubscribeMessage('message')
  onSendMessage(
    @MessageBody() data: { roomId: string; text: string },
    @ConnectedSocket() client: Socket,
  ) {
    const userId = client.data.user.id;
    console.log(data.roomId, typeof data.roomId);

    this.server.in(data.roomId).emit('newMessage', 'message');
  }

}
