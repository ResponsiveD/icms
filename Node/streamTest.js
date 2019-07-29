// so this provide set of apis for readable, writable duplex stream, transform
// whenever tcp client connect to tcp server 2gb going to provide to client, the meaning of provide could be anything, it could be like read the complete file into internal buffer then it will transmit this data to tcp client or it could be stream
var net = require('net');
var fs = require('fs');

var tcpServer = net.createServer();

tcpServer.on('connection', function (socket) {
	// fs.readFile('big.txt', function (err, data) {
	// 	socket.write(data);
	// })
	var rs = fs.createReadStream('file.txt');
	rs.pipe(socket);
	// this method pull data readable in chunks, and what is readable stream in this case reading chunks and transmitting data to writable stream and that is called piping also it provoids flow control also
	// this is transmitting in chunks in client, so this pipe is not restricted to ur tcp client or server it could be ur http client, http server
});
// becz we cannt take complete 2GB in mem, async and non-blocking, still in huge mem once that complete it will sends data to client and that is not possible at all, bcz its huge file it cannot store,read everything and after that it will transmit so this is not streaming, its trying to consume complete thing into internal buffer after that its tring to transmit over client, step is failing, so what is the solution is stream
tcpServer.listen(8000);
