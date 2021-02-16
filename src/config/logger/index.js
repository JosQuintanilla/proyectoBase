var winston = require('winston');
const config = require('../../../config');

var options = {
    console: {
        level: config.LOG_LEVEL || 'silly',
        handleExceptions: true,
        json: false,
        colorize: true
    }
};

const logger = (namespace) => {
    try {
        const logg = winston.createLogger({
            transports: [
                new winston.transports.Console(options.console)
            ],
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                winston.format.printf((info) => {
                    return `[${namespace}] ${info.level} - ${info.timestamp} - ${info.message}`;
                })
            ),
            exitOnError: false // do not exit on handled exceptions
        });
        return logg;
    } catch (error) {
        console.error(error);
    }
}

module.exports = logger;