import winston from 'winston';

const customLevels = {
  levels: {
    debug: 0,
    http: 1,
    info: 2,
    warning: 3,
    error: 4,
    fatal: 5
  },
  colors: {
    debug: 'blue',
    http: 'green',
    info: 'cyan',
    warning: 'yellow',
    error: 'red',
    fatal: 'magenta'
  }
};

winston.addColors(customLevels.colors);

const devLogger = winston.createLogger({
  levels: customLevels.levels,
  transports: [
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

const prodLogger = winston.createLogger({
  levels: customLevels.levels,
  transports: [
    new winston.transports.File({ filename: 'errors.log', level: 'error' }),
    new winston.transports.Console({ level: 'info' })
  ]
});

export const getLogger = () => {
  return process.env.NODE_ENV === 'production' ? prodLogger : devLogger;
};
