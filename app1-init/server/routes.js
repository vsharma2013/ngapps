var ApiRouter = require('koa-router');
var docController = require('./lib/controllers/docController.js');

var apiRouter = new ApiRouter();

apiRouter.get('/doc', docController.getDocumentList)
apiRouter.post('/doc', docController.createDocument);
apiRouter.get('/doc/:id', docController.getDocument);
apiRouter.put('/doc', docController.saveDocument);
apiRouter.del('/doc/:id', docController.deleteDocument);


module.exports = apiRouter;