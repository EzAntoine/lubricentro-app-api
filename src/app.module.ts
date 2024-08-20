import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './modulos/usuario/usuario.module';
import { ClienteModule } from './modulos/cliente/cliente.module';
import { VehiculoModule } from './modulos/vehiculo/vehiculo.module';
import { OrdenModule } from './modulos/orden/orden.module';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import config from 'config/config';
import { DatabaseModule } from './database/database.module';
//import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ApiKeyModule } from './auth/guards/api-key.module';
import { ProductoController } from './modulos/producto/controllers/producto.controller';

@Module({
  imports: [
    //MongooseModule.forRoot(process.env.DATABASE_MONGO_URI),
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
    }),
    UsuarioModule,
    ClienteModule,
    VehiculoModule,
    OrdenModule,
    DatabaseModule,
    AuthModule,
    ApiKeyModule,
  ],
  controllers: [AppController, ProductoController],
  providers: [AppService],
})
export class AppModule {}
