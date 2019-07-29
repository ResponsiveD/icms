var staticServer = require('./staticServer')
// trying to fetch all the clients routing,
function routeHandler(pathname, response){
	// and just delete responsiblity not doing any thing in the router,
	// but once i will come to post req, uploading any file, doing any custm url  upload/ then it will be useful
	staticServer.serve(pathname, response)
}

module.exports.routeHandler = routeHandler;