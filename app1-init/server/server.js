'use strict';

let koa = require('koa');
let app = koa();
let ks = require('koa-static');

let client = __dirname.replace('server', 'client');
let bower = __dirname.replace('app1-init/server', 'bower_components');


app.use(ks(client, {}));
app.use(ks(bower, {}));

app.listen(9999);	

console.log('server started at port 9999')