import { MiddlewareConsumer, Module } from '@nestjs/common';
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
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ApiKeyModule } from './auth/guards/api-key.module';
import { ProductoModule } from './modulos/producto/producto.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
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
    MongooseModule.forRoot(process.env.DATABASE_MONGO_URI),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    UsuarioModule,
    ClienteModule,
    VehiculoModule,
    OrdenModule,
    DatabaseModule,
    AuthModule,
    ApiKeyModule,
    ProductoModule,
    JwtModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        next();
      })
      .forRoutes('*'); // Apply to all routes
  }
}
