'use strict';

let _ = require('underscore');
let logger = require('./logger/logger');
let fs = require('fs');

class ApiResponse{
	send(httpResp, ctrlResp, resType){
		if (_.isEmpty(ctrlResp))
        return this.send200Err(httpResp, 'No data can be retrived for this operation.');
    if (resType.type === 'stream')
        return this.send200StreamResponse(httpResp, ctrlResp , resType.fileType);
		if (typeof ctrlResp == 'string')
			return this.send200Str(httpResp, ctrlResp);

		this.send200Json(httpResp, ctrlResp);
	}

	logAndSend(ctx, err) {
		let errLog = {
			request : ctx.request,
			message : err.message,
			stack : err.stack,
		};
		logger.error(errLog);
		this.send200Err(ctx.response, err.message);
	}

	send200Json(httpResp, ctrlResp) {
		var res = {
			success : true,
			result : ctrlResp,
			message : ''
		};
		httpResp.status = 200;
		httpResp.type = 'json';
		httpResp.body = res;
}

    send200StreamResponse(httpResp, ctrlResp, fileType) {
        httpResp.status = 200;
        httpResp.type = fileType;
        httpResp.body = fs.createReadStream(ctrlResp);
        httpResp.attachment(ctrlResp);
    }

	send200Str(httpResp, ctrlResp) {
		httpResp.status = 200;
		httpResp.type = 'text';
		httpResp.body = ctrlResp;
	}

	send200Err(httpResp, errMsg) {
		var res = {
			success : false,
			result : null,
			message : errMsg
		};
		httpResp.status = 200;
		httpResp.type = 'json';
		httpResp.body = res;
	}
}

let gApiResponse = new ApiResponse();

module.exports = {
	send		 :	 gApiResponse.send.bind(gApiResponse),
	logAndSend	 :	 gApiResponse.logAndSend.bind(gApiResponse)
}
