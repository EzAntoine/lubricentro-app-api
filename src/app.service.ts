import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from 'config/config';

@Injectable()
export class AppService {
  constructor(@Inject(config.KEY) private configS: ConfigType<typeof config>) {}
  getHello(): string {
    return 'Hello World!';
  }
}
