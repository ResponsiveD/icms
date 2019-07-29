// In this video how to std in any file
var fs = require('fs');
// var ws = fs.createWriteStream('out.txt');
// process.stdin.pipe(ws);

// this way pipe stad input readable stream or writable stream

// this way readable stream pipe into standard output

// var rs = fs.createReadStream('temp.txt');
// // then we pipe it std o/p
// rs.pipe(process.stdout);

// piping from std in to std out

// process.stdin.pipe(process.stdout);

// create file to file piping
var rs = fs.createReadStream('input.txt');
debugger;
var ws = fs.createWriteStream('output.txt');

rs.pipe(ws);

