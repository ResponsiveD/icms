// we need some modules like http req
var http = require('http');
// to serve all the file we need file system module
// var fs = require('fs');
// need url
var url = require('url');
// that is path to join all the path, absolute, relative path module
// var path = require('path');
// we need root directory all the path
// var rootDir = __dirname + "/public";
// store file location on req


function startServer(routeHandler) {
	var httpServer = http.createServer(function (request, response) {
		// var fileLocation;
		var pathname = url.parse(request.url).pathname;
		// pathname is like index.html
		// after getting this file the pathname is respons to router
		routeHandler(pathname, response);
	});
	httpServer.listen(8111);
}
// u can open into more client

module.exports.startServer = startServer;
