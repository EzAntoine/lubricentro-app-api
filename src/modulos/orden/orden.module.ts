import { Module } from '@nestjs/common';
import { OrdenService } from './services/orden.service';
import { OrdenController } from './controllers/orden.controller';
import { Order, OrderSchema } from './entities/order.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ClienteModule } from '../cliente/cliente.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema,
      },
    ]),
    ClienteModule,
  ],
  controllers: [OrdenController],
  providers: [OrdenService],
})
export class OrdenModule {}
