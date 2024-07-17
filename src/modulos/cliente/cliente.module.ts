import { Module } from '@nestjs/common';
import { ClienteService } from './services/cliente.service';
import { ClienteController } from './controllers/cliente.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from './entities/client.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Client.name,
        schema: ClientSchema,
      },
    ]),
  ],
  controllers: [ClienteController],
  providers: [ClienteService],
})
export class ClienteModule {}
