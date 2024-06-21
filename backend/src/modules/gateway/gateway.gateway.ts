import { Server, Socket } from 'socket.io';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';

import { JwtAuthGuard } from '../auth/jwt.strategy';
import { UseGuards } from '@nestjs/common';

@WebSocketGateway()
export class GatewayGateway {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('events')
  handleEvent(client: any, data: unknown): WsResponse<unknown> {
    const event = 'events';
    console.log(event, data);
    return { event, data };
  }
}
