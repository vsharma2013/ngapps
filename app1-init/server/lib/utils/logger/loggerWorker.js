'use strict';

let config = require('./../../../config/config');
let winston = require('winston');

let loggerApp = new (winston.Logger)({
	transports: [
		new (winston.transports.File)({ filename: config.logger.logFileName + '-' + process.pid + '.log' })
	]
});

let loggerError = new (winston.Logger)({
	transports: [
		new (winston.transports.File)({ filename: config.logger.errorLogFileName + '-' + process.pid + '.log' })
	]
});

process.on("message", function (log) {
	log.type === 'error' ? loggerError.log(log.type, log.data) : loggerApp.log(log.type, log.data);
	process.send("done");
});
