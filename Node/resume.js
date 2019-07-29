// non-flowing mode to flowing mode by resume method
// now we know data event on readable stream and once u create readable event remains in non flowing mode
// u can make it data event eiather event by data event or reserving it, once u called resume data is flowing that up to u want to capture it, attach data event handler and if u don't want to capture or even if u don't want event ever data will lost
var fs = require('fs');
var readableStream = fs.createReadStream('/var/log/kern.log');
// non flowing mode

// make it flowing mode, leaking data once u attached, data event handler it will start capturing all data or it will start pushing all data to data event handler
readableStream.resume();

readableStream.on('end', () => console.log('end event!!!'));
// won't say any event data emit it, will not capturing
// bcz data is lost, u r not capturing any data event, once attach any event u can capture all the data, so its just listening for end event
