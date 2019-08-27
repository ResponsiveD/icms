// var fs = require('fs');
// var http = require('http');


// var server  = http.createServer(function  (req, res) {
// 	var rstream = fs.createReadStream('existesfd');
// 	rstream.pipe(res);
// }).listen(6000);

// The Power of Abstract Syntax Trees
// ----------------------------------

// Parses
// ---------
// something about parses take ur code converted into something call us to syntax tree 
// console.log('slow'); sloves to the parses to get syntax tree
// like a reverse tree, cutdown the tree u shove in the chunks and then u  
// once trun into tree, tree is actually represented not as picture but as javascript obj
// bunch of parsers take into our code 
// babel, istanbul are secretly using parsers
// with asts are build time code transformation tools
// these thing are babel build time code one thing to another u can minify 
// application u can build tools with the migration process 
// and code inspection
// how to write custom rules for things happening in ur code and slap u if ure doing the wrong thing
// so code transformation 


// console.log(arguments)
// function dynamicArgsFunction () {
// 	console.log(arguments);
// }

// dynamicArgsFunction(2,3,4,5);

// var http = require("http");
// var fs = require("fs");
// // initializing event emitter
// var EventEmitter = require("events").EventEmitter;
// var ee = new EventEmitter();
 
// // A litter more complex example of using event emitter
// // create server and listen on port 3000
// var server = http.createServer();
// server.listen(3000);
// console.log("Server on localhost:3000");
 
// // the http has inherited the functions from EventEmitter
// // listen on for the request event, when the request happens
// // read a file and emit the error for errors and emit data if the read was successful.
// // The error event will pass the response object and the err object
// // The data event will pass the response object and the data object
// server.on("request", function (req, res) {
//     fs.readFile("./Node.js", "utf-8", function (err, data) {
//         if (err) {
//             ee.emit("error", res, err);
//         }
//         else {
//             ee.emit("data", res, data);
//             EventEmitter.init()
//         }
//     });
// });
 
// // listen on the error event, respond with the error when error happens
// ee.on("error", function (res, err) {
//     res.end(JSON.stringify(err));
// });
 
// // listen on the data event, respond with the data when the file was read successfully
// ee.on("data", function (res, data) { 
//     res.end(data); 
// });


//   const path = require('path');
//   const fs = require('fs');
//   const files = ['.base_profile', '.npmrc'];

// files.forEach(file => {
//   	try {	
// 	  	const filePath = path.resolve(process.env.HOME, file);
// 	  	const data = fs.readFileSync(filePath, "asdfasd");
// 	  	console.log('File data is ', data);
//   	}catch(err){
//   		if(err.code === "ENOENT")
//   		console.log('File not found')
//   		else throw err;
//   	}
// })


const fs = require('fs');
const data = fs.readFileSync(__filename);
console.log('File data is ', data);
console.log('TEST');