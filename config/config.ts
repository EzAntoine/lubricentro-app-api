import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  const {
    PORT,
    DATABASE_NAME,
    DATABASE_MONGODB,
    DATABASE_MONGO_ROOT_USER,
    DATABASE_MONGO_ROOT_PASS,
    DATABASE_MONGO_PORT,
    DATABASE_MONGO_HOST,
    DATABASE_MONGO_CONNECTION,
  } = process.env;
  return {
    database: {
      name: DATABASE_NAME,
      port: PORT || 3000,
    },
    mongo: {
      dbName: DATABASE_MONGODB,
      user: DATABASE_MONGO_ROOT_USER,
      password: DATABASE_MONGO_ROOT_PASS,
      port: parseInt(DATABASE_MONGO_PORT, 10),
      host: DATABASE_MONGO_HOST,
      connection: DATABASE_MONGO_CONNECTION,
      URI: `mongodb://${DATABASE_MONGO_HOST}:${DATABASE_MONGO_PORT}/${DATABASE_NAME}`,
    },
  };
});
