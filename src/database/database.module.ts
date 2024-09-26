import { Global, Module } from '@nestjs/common';
import { ConfigType, ConfigModule } from '@nestjs/config';
import config from 'config/config';
/* import { MongoClient } from 'mongodb'; */
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { dbName, URI } = configService.mongo;
        return {
          //uri: `${connection}://${user}:${password}@${host}:${port}/${dbName}`,
          //uri: `${connection}://${host}:${port}/${dbName}`,
          uri: URI,
          /* authMechanism: 'DEFAULT',
          authSource: 'admin', */
          /* user,
          pass: password, */
          dbName,
        };
      },
      inject: [config.KEY],
    }),
  ],
  /* providers: [
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { connection, user, password, host, port, dbName } =
          configService.mongo;
        console.log('Mongo Info: ', {
          connection,
          user,
          password,
          host,
          port,
          dbName,
        });

        const uri = `${connection}://${user}:${password}@${host}:${port}/?authMechanism=DEFAULT`;
        //const uri = `${connection}://${host}:${port}/${dbName}?authMechanism=DEFAULT`;
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db(dbName);
        return database;
      },
      inject: [config.KEY],
    },
  ], */
  exports: [/* 'MONGO', */ MongooseModule],
})
export class DatabaseModule {}
