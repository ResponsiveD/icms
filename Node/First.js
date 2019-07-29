// Node.js
// -- Event Driven
// -- Non Blocking IO
// -- V8
// How is diff from many server side languages like php
// And what is the meaning of non blocking finally we will create of basic http server
// http, tcp, udp, dns or any kind of server or string
// ff let see what is meaning of io, and this could be anything
// this io operations are in general very expensive
// lets come to the node process, how related to there io operation why this is non blocking
// Node is a single process unlike any other server side language, single process as well as single thread
// a pool of thread that does the io operations in general there is just one io operation and there just one main thread it is very similar to ur browser eviroinment, it asking for particular file, could be diff location, reading this file and serving this file io operations,
// so its asking for a file, very simple http req and this file going to the http res,
// client tell that do this io operation tell me this file done, in between i am going to serve other clients, do this io operation and waiting something will return and proceed i have one thread pool that will do the io operation and once ur done just inform me in terms of callback function and once the io operation done it can serve to other client
// this is not serving main thread, main thread serving diff client, in the req its job is take the req and delegate the responsibility of io operation to this thread pool, Non- Blocking

var http = require('http');
// this will create debugger u will put any break point u can verified the value of any variable, u can see the any prototype of any variable or object
function callback(req, res) {
	console.log('client connected');
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('webtuning');
}
var httpServer = http.createServer(callback);
// once it will started invoke this callback each of the req
httpServer.listen(8111, function () {
// node is running event loop running every http req, what is the prototype chain of this object what are the functions or method of this object or any method that is defined in prototype chain
// this req instead of object these the method what is like
// these are the props defined on this objects, after debug now going to event.js, it can emit any event go to the http server bcz we are using http module here!
	console.log('listening...!')
});