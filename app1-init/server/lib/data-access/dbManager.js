'use strict';

let _ = require('underscore');
let dbConns = require('./dbConnections');
let mongodb = require('mongodb').MongoClient;
let ObjectID = require('mongodb').ObjectID;
let config = require('./../../config/config');
let dsConfig = config.dataSources;


class DbManager {
	* saveDocument(doc, tenantId){
		let db = dbConns.getConnection(tenantId);
		if (!doc.id)
			doc.id = yield this.getNextSequence(db, 'doc_id');
		yield db.collection(config.collections.documents).insert(doc); 
		return doc;
	}

	* getDocument(tenantId, docId){
		let db = dbConns.getConnection(tenantId);
		let rdoc = yield this.getLatestVersionDocumentForId(db, parseInt(docId));
		delete rdoc._id;
		return rdoc;
	}

	* getNextSequence(db, name){
		let ret = yield db.collection(config.collections.counters).findAndModify(
			{ _id : name },
			 [],
			 { $inc : { seq : 1 } },
			 { new : true }
		);
		return ret.value.seq;
	}

	* getLatestVersionDocumentForId(db, id){
		let res =  yield db.collection(config.collections.documents).find({ id : id }).sort({ version : -1 }).toArray();
		return res[0];
	}


	* getDocumentList(tenantId, userId){
		let db = dbConns.getConnection(tenantId);
		let fields = {
			_id : 0,
			id : 1,
			version : 1,
			name : 1,
			number : 1,
			lastModifiedOn : 1,
			'createdBy.name' : 1,		
			'status.name' : 1
		};
		let res =  yield db.collection(config.collections.documents)
						   .find({}, fields )
						   .toArray();
		return res;
	}
    

	* deleteDocument(tenantId, docId){
		let db = dbConns.getConnection(tenantId);
		yield db.collection(config.collections.documents).remove({id : docId});
		return true; 
	}

	* archiveOldDocuments(tenantId, docId, uLimit){
		let db = dbConns.getConnection(tenantId);
		let query = {id : docId, version : {$lte : uLimit}};
		let docs = yield db.collection(config.collections.documents).find(query).toArray();
		yield db.collection(config.collections.documents_archive).insertMany(docs, {safe:true});
		yield db.collection(config.collections.documents).remove(query);
	}
}

   
module.exports = new DbManager();