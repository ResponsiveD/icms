// Tcp client
var net = require('net');
var socketUtils = require('./socketUtils')
var socket = net.connect({port: 8080}, function () {
	socket.write('hello from tcp client!')
	socketUtils.socketAddress(socket);
});

// once u read it on the client the data coming from the server, once u read on the server its data coming on the client
// socket.setEncoding('utf8');
socket.on('data', function (data) {
	// socket any data coming on the client u can do anything
	console.log(data.toLocaleString());
	socketUtils.socketStats(socket);
	// socket.destroy();
});
setInterval(function () {
	socket.write('ping pong ping pong');
}, 1000);
socket.on('close', function () {
	console.log('Close event on tcp client')
});