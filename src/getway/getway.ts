import { UseGuards } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsGuard } from 'src/auth/ws.guard';

@UseGuards(WsGuard)
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MyGetway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {

  }

  handleDisconnect(client: Socket) {

  }


  @SubscribeMessage('join')
  onJoin(@MessageBody() roomId: string, @ConnectedSocket() client: Socket) {
    roomId = roomId.toString();

    client.join(roomId);
    console.log(client.data);
    console.log(roomId, typeof roomId);
    this.server.in(roomId).emit('joined', {
      message: 'کاربری به اتاق جوین شد',
      userId: client.data.user.id || 'no id',
    });
  }

  @SubscribeMessage('message')
  onSendMessage(
    @MessageBody() data: { roomId: string; text: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(data.roomId, typeof data.roomId);

    this.server.in(data.roomId).emit('joined', 'message');
  }
}
