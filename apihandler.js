const { request } = require("express");

const request_tmp = {
	success: false,			// whether authentication was successful
	result: false,			// whether the operation was successful
	sendme: {},				// what data to send
	message: 'Hi welcome to trybXP API implementation',			// message to show status
	timestamp: Date.now(),
};

let map = {
	// path : property to launch (this way i can make a sitemap later)
	'data' : 'getdata',
	'appdata' : 'appdata',
};

// Handles all /api/* routes
function apiHandler(path, requestData,rawrequest) {
	let the_path = path.join('/');
	let runme = map[the_path];

	/*
	// for debugging purposes
	return {
		"path" : the_path,
		"runme" : runme,
		"type" : typeof actions[runme],
		"message" : "API is fucked",
	};
	// */

	// Example: /api/data → the_path = 'data'
	if(map[the_path] != undefined){
		if(requestData.method.toLowerCase() == "get"){
			act = _get[runme];
		} else if(requestData.method.toLowerCase() == "post"){
			act = _post[runme];
		}

		if(typeof act == "function"){
			return act(requestData,rawrequest);
		}
	}

	return { error: 'API route not found', the_path };
}

const _get = {};
const _post = {};

// get actions
_get['getdata'] = (rdata,req) => {
	return { message: 'Hi welcome to trybXP', timestamp: Date.now() };
};

_get['appdata'] = (rdata,req) => {
	let res = {...request_tmp};

	res.success = true;
	res.result = true;
	res.sendme = {info: "appdata",source: "API"};

	return res;
}

// post actions
_post['getdata'] = (rd,rq) => {
	let res = {...request_tmp};

	res.success = true;
	res.result = true;
	res.message = "welcome to trybXP API implementation";

	return res;
}

module.exports = apiHandler;
