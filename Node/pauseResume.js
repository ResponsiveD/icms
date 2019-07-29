// readable stream going to non flowing mode make it flowing mode
// pause on any source of data is ur readable stream so it will stop emitting any data event and data will be kept in buffer internal buffer once u resume it again it will start emitting data event, so resume is starting emitting data event pause emitting data event,
// data will be pause data is intact inside internal buffer it will not be lost4

var fs = require('fs');
var readableStream = fs.createReadStream('file.txt');
// non flowing mode
// var dataRead = 0;

readableStream.setEncoding('utf8');
// if speed is not matching u can use pipe method or readable event
readableStream.on('data', (function (dataRead=0){
	// this mem is captured in return function it always rem this data rates
	// although outer function is garbage collector but inner function or outter
	// function always var called closure
	return function (chunck) {
		dataRead += chunck.length;
		console.log('data= ' + chunck.length);
		console.log('data read = ' + dataRead);
		readableStream.pause();
		setTimeout(function () {readableStream.resume()}, 100);
	};
})(0));

readableStream.on('end', () => console.log('end event'));



