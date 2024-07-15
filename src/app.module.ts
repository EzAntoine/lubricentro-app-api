import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { ClienteModule } from './cliente/cliente.module';
import { VehiculoModule } from './vehiculo/vehiculo.module';
import { OrdenModule } from './orden/orden.module';
import { UsuarioController } from './modules/usuario/controllers/usuario.controller';
import { VehiculoController } from './vehiculo/vehiculo.controller';
import { OrdenController } from './orden/orden.controller';
import { ClienteController } from './modules/cliente/controllers/cliente.controller';
import { UsuarioService } from './modules/usuario/services/usuario.service';
import { OrdenService } from './modules/orden/services/orden.service';
import { ClienteService } from './modules/cliente/services/cliente.service';
import { VehiculoService } from './modules/vehiculo/services/vehiculo.service';

@Module({
  imports: [UsuarioModule, ClienteModule, VehiculoModule, OrdenModule],
  controllers: [
    AppController,
    UsuarioController,
    VehiculoController,
    OrdenController,
    ClienteController,
  ],
  providers: [
    AppService,
    UsuarioService,
    OrdenService,
    ClienteService,
    VehiculoService,
  ],
})
export class AppModule {}
