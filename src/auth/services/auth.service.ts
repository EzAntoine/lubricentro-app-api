import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modulos/usuario/services/usuario.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.getUser({ username });
    //if (!user) return null;
    if (!user) throw new NotAcceptableException('Usuario no encontrado!');
    if (typeof pass !== 'string') {
      throw new Error('Invalid password type!');
    }
    const passwordValid = await bcrypt.compare(pass, user.password);

    if (user && passwordValid) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '60s',
      }),
    };
  }

  /* generateJWT(user: User) {
    const payload = { role: user.role, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  } */
}
