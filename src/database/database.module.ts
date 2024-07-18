import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from 'config/config';
import { MongoClient } from 'mongodb';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { connection, user, password, host, port, dbName } =
          configService.mongo;
        return {
          //uri: `${connection}://${user}:${password}@${host}:${port}/${dbName}`,
          uri: `${connection}://${host}:${port}/${dbName}`,
          user,
          pass: password,
          dbName,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { connection, /*  user, password, */ host, port, dbName } =
          configService.mongo;
        //const uri = `${connection}://${user}:${password}@${host}:${port}/?authMechanism=DEFAULT`;
        const uri = `${connection}://${host}:${port}/${dbName}?authMechanism=DEFAULT`;
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db(dbName);
        return database;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['MONGO', MongooseModule],
})
export class DatabaseModule {}
