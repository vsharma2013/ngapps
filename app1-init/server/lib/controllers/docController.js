'use strict';

let dbMgr = require('./../data-access/dbManager');
let docMgr = require('./../core/docManager');
var apiResponse = require('./../utils/apiResponse');


let api = {
	GET_DOC_LIST       : 1,
    CREATE_DOC         : 2,
    GET_DOC            : 3,
    SAVE_DOC           : 4,
    DELETE_DOC         : 5
}

function* execute(apiID, appCtx) {
	let tenantId = 'docdb';
    let execFunction = null;
    let resType = { type : 'json', fileType : null };
    switch (apiID) {
        case api.GET_DOC_LIST:
            execFunction = docMgr.getDocumentList(tenantId);
            break;
        case api.CREATE_DOC:
            execFunction = docMgr.createDocument(tenantId);
            break;
        case api.GET_DOC:
            execFunction = docMgr.getDocument(tenantId, parseInt(appCtx.params.id));
            break;
        case api.SAVE_DOC:
            execFunction = docMgr.saveDocument(appCtx.request.body, tenantId);
            break;
        case api.DELETE_DOC:
            execFunction = docMgr.deleteDocument(tenantId, docId);
            break;
    }
    let ctrlResp = yield execFunction;
    apiResponse.send(appCtx.response, ctrlResp, resType);
}

module.exports = {
    getDocumentList :      function* () { yield execute(api.GET_DOC_LIST, this); },
    createDocument :       function* () { yield execute(api.CREATE_DOC, this); },
    getDocument :          function* () { yield execute(api.GET_DOC, this); },
    saveDocument :         function* () { yield execute(api.SAVE_DOC, this); },
    deleteDocument :  	   function* () { yield execute(api.DELETE_DOC, this); },
}