'use strict';

let co = require('co');
let _ = require('underscore');
let mongodb = require('mongodb').MongoClient;
let config = require('./../../config/config');
let logger = require('./../utils/logger/logger');

let allConnected = false;

class DbConnections{
    constructor(){
        this.connections = {};
        this.counters = [
			{ _id : 'doc_id', seq : 0, collectionName : config.collections.documents }
        ];
        this.connectOptions = {
			server : {
			    poolSize : 10
            }
        };
    }
 

    * init(){
        let tenants = Object.keys(config.dataSources);
        for(var i = 0 ; i < tenants.length; i++){
            let tenantId = tenants[i];
            let ds = config.dataSources[tenantId];
            let db = yield mongodb.connect(ds.conn_str, this.connectOptions);
            this.connections[tenantId] = db;
            for(var j = 0; j < this.counters.length; j++){
                yield this.addCounterToDb(this.counters[j], db);
            }
        };
    }
 
    * addCounterToDb(ctr, db){
        let ctrColl = db.collection(config.collections.counters);
        let ctrVal = yield this.getCounterValue(ctr, db);
        
        yield ctrColl.update(
            {
                _id : ctr._id
            },
            {
                $set : { seq : ctrVal.seq, collectionName : ctrVal.collectionName } 
            },
            {
                upsert : true
            }
        );
    }

    * getCounterValue(ctr, db){
        let res = yield db.collection(ctr.collectionName).find({}, {_id : 0, id : 1}).sort({id : -1}).limit(1).toArray();
        if(_.isEmpty(res)) return ctr;

        let ctrVal = _.extend({}, ctr);
        ctrVal.seq = res[0].id;

        return ctrVal;
    }

    getConnection(tenantId){
        return this.connections[tenantId];
    }
}

let gDbConns = new DbConnections();

function success(val){
    logger.log(val)
}

function error(val){
    logger.error(val);
}

function* run(){
    yield gDbConns.init();
    console.log('All DBs connected');
    allConnected = true;
    return true;
}

co(run).then(success, error);

module.exports = {
    isConnected : function() { return allConnected; },
    getConnection : function(tenantId) { return gDbConns.getConnection(tenantId);}
}


