import { Injectable } from '@nestjs/common';

@Injectable()
export class GetwayService {
  private rooms = [
    { id: 1, isUser: true, users: [1, 2], name: undefined },
    { id: 1, isUser: true, users: [1, 2], name: '' },
  ];
  private users = [
    { id: 1, name: 'taha' },
    { id: 2, name: 'akbar' },
  ];
  private messages = [
    { userId: 1, roomId: 1, message: 'fefn', time: new Date() },
  ];
  roomsByUserId(userId: number) {
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
    return convertedRooms;
  }
  async sendMessage(userId: number, roomId: number, message: string) {
    const check = await this.checkUserByRoomId(userId, roomId);
    if (check) {
      const payload = { message, roomId, time: new Date(), userId };
      this.messages.push(payload);
      return payload;
    }
    return false;
  }
  async checkUserByRoomId(userId: number, roomId: number): Promise<boolean> {
    return true;
  }
}
