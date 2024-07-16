import { Module } from '@nestjs/common';
import { ClienteService } from './services/cliente.service';
import { ClienteController } from './controllers/cliente.controller';

@Module({
  controllers: [ClienteController],
  providers: [ClienteService],
})
export class ClienteModule {}
