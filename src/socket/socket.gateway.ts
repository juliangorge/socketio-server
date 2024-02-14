
import { OnModuleInit } from '@nestjs/common'
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class SocketGateway implements OnModuleInit {
  @WebSocketServer()
  private server: Server;

  private connectedClients: Map<string, Socket> = new Map();

  onModuleInit() {
    this.server.on('connection', (socket: Socket) => {
      // Asignar un ID de usuario único durante la conexión
      const userId = Array.isArray(socket.handshake.query.userId)
      ? socket.handshake.query.userId[0]  // Tomar el primer elemento si es un array
      : socket.handshake.query.userId || ''; // Tomar el valor directo o asignar una cadena vacía si es nulo

      // Almacenar el socket del cliente en el mapa usando el ID de usuario como clave
      this.connectedClients.set(userId, socket);

      //console.log(`Client connected: ${userId}`);

      socket.on('disconnect', () => {
        this.handleDisconnect(userId);
      });
    });
  }

  private handleDisconnect(userId: string): void {
    this.connectedClients.delete(userId);
    //console.log(`Client disconnected: ${userId}`);
  }

  @SubscribeMessage('newMessage')
  onNewMessage(channel: string, @MessageBody() body: any, userId?: string){
    if(userId){
      const client = this.connectedClients.get(userId)
      if(client){
        this.server.to(client.id).emit(channel, {
          msg: channel,
          content: body
        })
      }
    }
    else{
      this.server.emit(channel, {
        msg: channel,
        content: body
      })
    }
  }
}
