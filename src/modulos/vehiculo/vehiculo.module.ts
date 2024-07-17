import { Module } from '@nestjs/common';
import { VehiculoService } from './services/vehiculo.service';
import { VehiculoController } from './controllers/vehiculo.controller';

@Module({
  controllers: [VehiculoController],
  providers: [VehiculoService],
})
export class VehiculoModule {}
