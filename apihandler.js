let map = {
	// path : property (this way i can make a sitemap later)
	'data' : 'getdata',
	'appdata' : 'appdata',
};

// Handles all /api/* routes
function apiHandler(path, requestData,rawrequest) {
	let the_path = path.join('/');
	let runme = map[the_path];

	/*
	return {
		"path" : the_path,
		"runme" : runme,
		"type" : typeof actions[runme],
		"message" : "API is fucked",
	};
	// */

	// Example: /api/data → path = 'data'
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
	let outdata = {
		message: 'Hi welcome to trybXP API implementation',
		success: true, 
		result: true, 
		data: {info: "appdata",source: "API"}, 
		timestamp: Date.now()
	};

	return outdata;
}

// post actions
_post['getdata'] = (rd,rq) => {
	return {message: "post request successfull"};
}

module.exports = apiHandler;