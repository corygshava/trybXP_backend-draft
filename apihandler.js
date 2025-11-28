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
function apiHandler(path, requestData, rawrequest) {
	// Normalize path: if path is string (single segment) or array (multi-segment)
	const the_path = Array.isArray(path) ? path.join('/') : path;

	// Log IP and path
	const ip = rawrequest.ip || 
				rawrequest.headers['x-forwarded-for']?.split(',')[0]?.trim() || 
				rawrequest.connection?.remoteAddress || 
				'unknown';
	console.log(`[${ip}] - ${the_path}`);

	const runme = map[the_path];

	/*
	// for debugging purposes
	return {
		"path" : the_path,
		"runme" : runme,
		"type" : typeof actions[runme],
		"message" : "API is fucked",
	};
	// */

	if (map[the_path] !== undefined) {
		let act;
		const method = requestData.method.toLowerCase();

		if (method === 'get') {
			act = _get[runme];
		} else if (method === 'post') {
			act = _post[runme];
		}

		if (typeof act === 'function') {
			return act(requestData, rawrequest);
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
