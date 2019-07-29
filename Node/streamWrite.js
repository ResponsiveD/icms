// create cust stream, trans stream, duplex stream
// very basic api, that is write method on writable stream
var fs = require('fs');
var ws = fs.createWriteStream("test");
// can write any buffer or stream
var isDrained = ws.write('some data', 'utf8', function () {
	// once the write is complete this function invoke
	console.log('write is done!')
});
console.log(isDrained);
// once u write any of the underlying system it could be writable stream
// filesystem it could be a socket, it could be tcp socket http resp or any kind of writable, so it will return variable it could be true or false, true means everything written succ to writable stream, false still in buffe u have to listen for drain event once that the drain event is emitted, u cn write back on writable stream

