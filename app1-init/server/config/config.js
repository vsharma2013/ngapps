'use strict';
let corsOptions = {
	origin : '*',
	allowMethods : 'POST,GET,PUT,DELETE,OPTIONS',
	exposeHeaders : 'WWW-Authenticate, Server-Authorization',
	allowHeaders : 'UserExecutionContext, x_radio_partnerid, x_radio_auth, Cache-Control, ragma, Origin, Authorization, Content-Type, X-Requested-With',
	// maxAge : '',
	credentials : true
}

let collections = {
	documents : 'documents',
}

let config_local = {
	ports : {
		local : 9090,
		secure : 443,
	},
	corsOptions : corsOptions,
	collections : collections,
	logger : {
		logFileName : './log/app',
		errorLogFileName : './log/app_error'
	}
	dataSources : {
		docdb : {
			conn_str : 'mongodb://localhost:27017/DocumentDB'
		}
    }
}


let config_prod = {};

let config = {
    local : config_local
}

let env = 'local';
module.exports = config[env];