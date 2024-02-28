import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class WebsocketGateways
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  handleConnection(client: Socket) {
    console.log(`client connected: ${client.id}`);
  }
  handleDisconnect(client: Socket) {
    console.log(`client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    // this.server.emit('message', data); Lo reciben todos los clientes
    console.log(data);
    //Solo lo reciben los que escuchan el evento message
    client.broadcast.emit('message', data);
  }

  @SubscribeMessage('onNewUser')
  handleNewUser(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    console.log(data);
    //Connect to database
    // save user
    // read user
    client.broadcast.emit('onNewUser', data);
  }
}
