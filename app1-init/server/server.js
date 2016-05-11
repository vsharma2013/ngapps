'use strict';

let koa = require('koa');
let ks = require('koa-static');

var fs = require('fs');
var cors = require('kcors');
var common = require('koa-common');
var gzip = require('koa-gzip');
var bodyParser = require('koa-bodyparser');
var config = require('./config/config');
var apiResponse = require('./lib/utils/apiResponse');
var dbConns = require('./lib/data-access/dbConnections');

//var apiRoutes = require('./routes');

let client = __dirname.replace('server', 'client');
let bower = __dirname.replace('app1-init/server', 'bower_components');


let app = koa();

app.use(ks(client, {}));
app.use(ks(bower, {}));

app.listen(9999);	

console.log('server started at port 9999')