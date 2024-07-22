import { Module } from '@nestjs/common';
import { VehicleService } from './services/vehiculo.service';
import { VehiculoController } from './controllers/vehiculo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Vehicle, VehicleSchema } from './entities/vehicle.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Vehicle.name,
        schema: VehicleSchema,
      },
    ]),
  ],
  controllers: [VehiculoController],
  providers: [VehicleService],
})
export class VehiculoModule {}
