var winston = require('winston'),
    CloudWatchTransport = require('winston-aws-cloudwatch');

require('dotenv').config();
var NODE_ENV = process.env.NODE_ENV || 'development';

const logger = winston.createLogger({
    format: winston.format.json(),
    transports: [
        new (winston.transports.Console)({
        timestamp: true,
        colorize: true,
        })
    ]
});
if (process.env.NODE_ENV === 'production') {
    logger.add(new CloudWatchTransport({
        logGroupName: 'sended-log',
        logStreamName: NODE_ENV,
        createLogGroup: false,
        createLogStream: true,
        formatLog: function (item) {
            return item.level + ': ' + item.message + ' ' + JSON.stringify(item.meta)
        }
    }));
}

// log if the level is less than the given below level
// { 
//     error: 0, 
//     warn: 1, 
//     info: 2, 
//     http: 3,
//     verbose: 4, 
//     debug: 5, 
//     silly: 6 
//   }


logger.level = process.env.LOG_LEVEL || "silly";

logger.stream = {
  write: function(message, encoding) {
    logger.info(message);
  }
};

module.exports = logger;