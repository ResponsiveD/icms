var fs = require('fs');
var path = require('path');
var rootDir = __dirname + "/public";

function serve(pathname, response) {
	var fileLocation;
	fileLocation = path.join(rootDir, pathname);
	// read stream from the pipe just resp
	// come to error handling it will crash ur server imm
	var readStream = fs.createReadStream(fileLocation);
	readStream.pipe(readStream);
}

module.exports.serve = serve;