// Tcp server
var net = require('net');
var socketUtils = require('./socketUtils');

var tcpServer = net.createServer({ allowHalfOpen: false });
tcpServer.on('connection', function (socket) {
// simple this is conn listener or callback. we have to listen for some data let's write some logging although this is not necessarily constant, whenever any client req to this server conn will be established
// tcp server is duplex stream u can read any data on this socket when u write any data on the socket. it goes to the client and when u read it read from the client, this is async server creating the server waiting for the client req on the client conn, server will get any conn this callback function will be ex
	console.log('establised connection....!');
	socketUtils.socketAddress(socket);
	// get number of concurrent tcp connection
	tcpServer.getConnections(function (error, count) {
		console.log('get number of tcp connections= '+ count);
	});
	socket.on('end', function () {
		// u can send the connection into end of this connection
		socketUtils.socketStats(socket);
		console.log('Server disconnected....!')
	});
	socket.on('close', function () {
		console.log('closed event fired');
	});
// this tcp server also it can emit event, this inherits from event emitter, when will get any data it will listen for data event, callback event is associated event so this event handler any event, this socket not available on any time, this will available on when client connects to the server
	socket.on('data', function (data) {
		// all connect
		// duplex steam, when u write any data, writing back to the client
		console.log('Data recieve from the tcp client: ');
		// sending data to the client so it first it goes to the  buffer
		// from the user space to the kernal
		var flused = socket.write('Sever Reply: ' + data);
		console.log(flused);
		// every would be true sometimes it false, its not send any data to the kernal buffer
		// so this is called drain event
		// u can emit any event also
		// socket.emit('error', new Error('Forcefully injected error'));
		// this error is not handle how to handle
		// inside data handler monitor the bytes
		// socketUtils.socketStats(socket);
		// written will appending the 'server reply' on write
	});
	socket.on('error', function (error) {
		// every data event handle by this event each of the error handler using this error handler
		console.log('something wrong happend here');
		// socket.end is just send one fin packet that signals i want connection would be closed, it might be some sending activity it can sending data or pending packets or it can receive something
		// restrict number of tcp connection
		// socket.end('socket can send some more data but it will be ended!')
		// destroyed event, it wont return any data, send any data
		socket.destroy();
	});
	socket.setTimeout(30000);
	socket.on('timeout', function () {
		console.log('timeout out....')
		// each client timeout event
	})
});
tcpServer.maxConnections=10;
// u can emit any event, conn event once the server its started listening something u can do anything
// tcp server open for existing connection but close for new
setTimeout(function () {
	tcpServer.close(function () {
		console.log('server closed')
	})
}, 60000);

// server is closed all the tcp server working after this
// alt way to closed event
tcpServer.on('close', function () {
	console.log('second close event handler...!');
});
tcpServer.listen(8080);
// tcpServer.listen(function () {
// 	// random server port
// 	var port = tcpServer.address().port;
// 	console.log('Server started listening: '+ port)
// });