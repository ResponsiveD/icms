var net = require('net');

var sockets = [];
var tcpServer = net.createServer();

tcpServer.on('connection', function (socket) {
	console.log('connection established');
	socket.setEncoding('utf8');
	sockets.push(socket);
	socket.on('data', function (data) {
		console.log(data);
		// we need to iterate over complete sockets array, and each of the sockets and excluding itself brodcast it
		var clients = sockets.length;
		for (var i=0;i<clients;i++){
			if (sockets[i] === socket) continue;
			sockets[i].write(data);
		}
		// this socket ended by other party, that means we are not clearing from the socket form the socket array
	});
	socket.on('end', function () {
		sockets.splice(sockets.indexOf(socket, 1))
	})
});

tcpServer.listen(8000);