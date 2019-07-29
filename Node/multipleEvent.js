var net = require('net');

// var tcpServer = net.createServer();
// tcpServer.on('connection', function (socket) {
// 	// attach multiple event in pipe event
// 	socket.setMaxListeners(1);
// 	socket.on('pipe', function () {
// 		console.log('pipe event! ')
// 	});
// 	socket.on('pipe', function () {
// 		setTimeout(function () {
// 			socket.unpipe(socket);
// 		}, 30000)
// 	});
// 	// console.log(socket.listeners('pipe')[ 1 ].toString());
// 	socket.pipe(socket);
// // bcz all event handlers are attached to the pipe event, quickly possible mem leaks or ur over subs, if u want more event handler use set maxListeners
// });
// tcpServer.listen(8000)

var tcpServer = net.createServer();

tcpServer.on('connection', function (socket) {
	// attach any event handler at one time, any particular data event, will invoke only one time
	socket.once('data', function (data) {
		socket.write(data);
	});
	var listener = socket.listeners('data')[0];
	setTimeout(function (listener) {
		socket.removeListener('data', listener)
	}, 20000)
});
tcpServer.listen(8000);
