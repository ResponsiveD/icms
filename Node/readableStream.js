var fs = require('fs');
var rs = fs.createReadStream('file.txt');
// var readableStream = fs.createReadStream('file.txt');
// readableStream.setEncoding('utf8');
// function read(stat) {
// 	// data is available u want to consume then u read to consume
// 	return function () {
// 		var chunk;
// 		console.log(stat.count++)
// 		// null is end event
// 		while(null !==(chunk = this.read())){
// 			stat.dataRead += chunk.length;
// 			console.log(chunk.length);
// 			console.log(stat.dataRead);
// 		}
// 	}
// }
//
// readableStream.on('readable', read({count:0, dataRead:0}));
// readableStream.on('end', () => console.log('end event!!'))

// pipe event on writable stream
var ws = fs.createWriteStream('outd.txt');

ws.on('pipe', function (source) {
	console.log('pipe event fired');
	console.log(source === rs);
	setTimeout(function () {
		rs.unpipe(ws);
	}, 20000)
});
rs.pipe(ws);

