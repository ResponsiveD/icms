var http = require('http');
var url = require('url');
// convert url req url into several objects, path pathname, href query
// var httpServer = http.createServer(function(request, response){
//   // once ur client request is done, this function will exe
//   // response.write('hello world');
//   response.end('hello world');
// });
// // u can see transfering coding in chuncks, u can keep alive,
// // 200 http status, so this by default node is sending to the client
// httpServer.listen(8000)
// method chaining
// u can minimize code into chaining
http.createServer(function(request, response){
	// set header on http res, any kind of status code, after that u can give headers like obj, or u want to set particular header use resp.setHeader and this method define on resp obj
	// resp that is sending to client, mime type
	// response.statusCode = 404;
	// response.setHeader('Content-Type', 'text/plain');
	var body = "hello";
	var parsed = url.parse(request.url);
	// simply fide url converting into an objects
	// response.writeHead(200, {
	// 	'Content-Type':'text/plain',
	// 	'Content-Length': body.length
	// });
	response.writeHead(200, {
		'Content-Type':'text/plain',
		// 'Location': 'https://www.webtunings.com',
		'Content-Length': body.length
	});
	// using any encoding num of char, actual bytes, u need to use buffer.byteLength
	// response.write('hello world!\n');
	response.end(body);
}).listen(8000);

// meaning of static file is once browser any req for any file html,js,css etc nodejs will provide to the browser and
// there is no by default any server for static file, or http or tcp u need to create all the servers, listen for it, pipe or stream all the data, manually set all the media type, post and get data,
// it is not simple like apache u already have file server once u req an html file or js or css, apache look into dir and will provide u in the file
// websocket protocol for any kind of things
