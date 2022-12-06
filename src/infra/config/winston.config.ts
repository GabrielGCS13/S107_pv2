import {
  utilities as nestWinstonModuleUtilities,
  WinstonModuleOptions,
} from 'nest-winston';
import * as winston from 'winston';

const winstonConfig: WinstonModuleOptions = {
  levels: winston.config.npm.levels,
  level: 'verbose',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize({ all: true }),
        nestWinstonModuleUtilities.format.nestLike()
      ),
    }),
  ],
};

export default winstonConfig;
