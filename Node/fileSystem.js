var fs = require('fs');

fs.readFile('tcpClient.js',{ encoding: 'utf8' }, function (error, data) {
	console.log(data)
});
console.log('before read');
// this callback invoke the after the console