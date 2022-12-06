import { Config } from './interfaces';

const config: Config = {
  app: {
    environment: process.env.APP_ENV,
    port: Number(process.env.APP_PORT),
  },
  jwt: {
    secret: process.env.APP_SECRET,
    expiresIn: '3d',
  },
  swagger: {
    title: 'Social Commerce Web API',
    description:
      'API responsible to provide data for the Social Commerce application',
    version: '0.2',
    tag: 'social',
    path: '/docs',
  },
  typeOrmDb: {
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB_NAME,
    synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
    autoLoadEntities: true,
  },
  ratelimit: {
    ttl: Number(process.env.THROTTLER_TTL),
    limit: Number(process.env.THROTTLER_LIMIT),
  },
};

export default config;
