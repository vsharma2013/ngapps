'use strict';
var config = require('./../../../config/config');
var path = require('path');
var fs = require('fs');
var cp = require("child_process");

class Logger{
	constructor() {
		this.loggerWorker = cp.fork('.//lib//utils//logger//loggerWorker');
		this.cleanLogDir();
	}

	info(params) {
		this.log('info', params);
	}

	debug(params) {
		this.log('debug', params);
	}

	warn(params) {
		this.log('warn', params);
	}

	error(params) {
		this.log('error', params);
	}

	log(type, params) {
		var log = {
			type : type,
			data : params
		}
		this.loggerWorker.send(log);
	}

	cleanLogDir() {
		var logDir = path.dirname(config.logger.logFileName);
		var files = fs.readdirSync(logDir);
		files.map(f => {
			var filePath = path.resolve(logDir, f);
			if (fs.statSync(filePath).isFile() && (path.extname(f) === '.log' || path.extname(f) === '.pdf'))
				fs.unlinkSync(filePath);
		});
	 }
}
var gLogger = new Logger();

module.exports = {
	info : gLogger.info.bind(gLogger),
	debug : gLogger.debug.bind(gLogger),
	warn : gLogger.warn.bind(gLogger),
	error : gLogger.error.bind(gLogger)
};