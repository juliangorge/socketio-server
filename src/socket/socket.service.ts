import { Injectable } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';

@Injectable()
export class SocketService {
  constructor(private gateway: SocketGateway) {}

  public emit(channel: string, payload: any, userId?: string){
    this.gateway.onNewMessage(channel, payload, userId)
  }

}
