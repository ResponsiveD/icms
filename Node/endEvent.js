var fs = require('fs');
var rs = fs.createReadStream('data.txt');
var ws = fs.createWriteStream('outd.txt');
// end event on writable stream
rs.pipe(ws, {end: false});
rs.on('end', function () {
	console.log('end event read stream');
	ws.end('webtunnings');
});
ws.on('finish', function () {
	console.log('finish event write stream')
});