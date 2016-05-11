'use strict';

let _ = require('underscore');
let dbMgr = require('./../data-access/dbManager');
let dbConns = require('./../data-access/dbConnections');
let config = require('./../../config/config');
let logger = require('./../utils/logger/logger');


class DocumentManager{
    
    * saveDocument(cDoc, tenantId){
		yield this.archiveOldDocuments(cDoc, tenantId);
		let nDoc = yield dbMgr.saveDocument(cDoc, tenantId);
		if(nDoc._id) 
			delete nDoc._id;
		return nDoc;
	}

	* getDocument(tenantId, docId){
		let doc = yield dbMgr.getDocument(tenantId, docId);
		return doc;
	}
    	
	* getDocumentList(tenantId){
		let reqs = yield dbMgr.getDocumentList(tenantId);
		let idVsDocs = {};
		reqs.map(doc => {
			if(!idVsDocs[doc.id])
				idVsDocs[doc.id] = { doc : doc, version : doc.version };
			else{
				if( doc.version > idVsDocs[doc.id].version)
					idVsDocs[doc.id] = { doc : doc, version : doc.version };
			}
		});
		let latestDocs = _.pluck(idVsDocs, 'doc');
		latestDocs = _.sortBy(latestDocs, function(lDoc) { return -lDoc.lastModifiedOn; });
		return latestDocs.slice(0,100);   
	}

	* createDocument(tenantId){
		return {};
	}

	* deleteDocument(tenantId, reqId){
		let res = yield dbMgr.deleteDocument(tenantId, reqId);
		return {deleted : true, reqId : reqId};
    }
    
    * archiveOldDocuments(latestDoc, tenantId){
    	var keepVersion = 5;
    	if(latestDoc.version < (keepVersion + 1)) return;

    	let uLimit = latestDoc.version - keepVersion;
    	yield dbMgr.archiveOldDocuments(tenantId, latestDoc.id, uLimit);
    }
} 

let gDocMgr = new DocumentManager();

module.exports = {
	saveDocument    : gDocMgr.saveDocument.bind(gDocMgr),
	getDocument     : gDocMgr.getDocument.bind(gDocMgr),
	getDocumentList : gDocMgr.getDocumentList.bind(gDocMgr),
	createDocument  : gDocMgr.createDocument.bind(gDocMgr),
	deleteDocument  : gDocMgr.deleteDocument.bind(gDocMgr)
}