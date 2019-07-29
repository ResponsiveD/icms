var httpServer = require("./httpServers");
var routeHandler = require("./router").routeHandler;
httpServer.startServer(routeHandler);
