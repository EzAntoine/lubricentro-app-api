import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modulos/usuario/services/usuario.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/modulos/usuario/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const users = await this.userService.findAll();
    const user = users.find((u) => u.username === username);
    if (user) {
      const isMatch = await bcrypt.compare(pass, user.password);
      if (isMatch) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...rta } = user.toJSON();
        return rta;
      } else {
      }
    } else {
    }
    return null;
  }

  generateJWT(user: User) {
    const payload = { role: user.role, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
