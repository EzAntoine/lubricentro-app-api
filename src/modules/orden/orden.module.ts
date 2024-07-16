import { Module } from '@nestjs/common';
import { OrdenService } from './services/orden.service';
import { OrdenController } from './controllers/orden.controller';

@Module({
  controllers: [OrdenController],
  providers: [OrdenService],
})
export class OrdenModule {}
