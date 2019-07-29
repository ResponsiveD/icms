// push stream data event read kernal
var fs = require('fs');
// further we can attach read stream on the events
//
var readStream = fs.createReadStream('/var/log/kern.log');
// u can attach readable event end event or u can attach data event or end event
// once u attach data event goes into flowing mode and it cannot go back to non flowing mode
// u don't have control handle ur data if u dont have capability to read all the data u may lose some data
// encoding on the chunk, raw data to text
readStream.setEncoding('utf8');
var readEventCount = 0;
function dataEventHandler(chunk){
	//
	// console.log(chunk);
	console.log(chunk.length);
	readEventCount++;
	// 17 times invoked
}

readStream.on('data', dataEventHandler);

readStream.on('end', function(){
	console.log('no more data to read');
	console.log(readEventCount);
});
