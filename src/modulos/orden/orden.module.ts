import { Module } from '@nestjs/common';
import { OrdenService } from './services/orden.service';
import { OrdenController } from './controllers/orden.controller';
import { Order, OrderSchema } from './entities/order.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema,
      },
    ]),
  ],
  controllers: [OrdenController],
  providers: [OrdenService],
})
export class OrdenModule {}
