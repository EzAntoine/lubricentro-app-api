import { Module } from '@nestjs/common';
import { UsuarioController } from './controllers/usuario.controller';
import { UserService } from './services/usuario.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UsuarioController],
  providers: [UserService],
})
export class UsuarioModule {}
