import { Module } from '@nestjs/common';
import { WebsocketGateways } from './websockets.gateway';

@Module({
  providers: [WebsocketGateways],
})
export class GatewayModule {}
