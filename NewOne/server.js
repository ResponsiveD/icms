// Node 1
// Node JS
// -- Event Driven
// -- Non blocking IO
// -- Javascript Runtime Enviroinment V8 engine 

// http, tcp, udp, of any kind of server or stream, 
// first of all let see what is meaning of i/o, 
// and this io operations are in general very expensive
// IO comes to the node process, node process related to the io operation in non-blocking
// Node is single process unlike ur any other server side language, it says single process - as well as single thread
// all it keeps a pool of thread, Just look like browser enviroinment, just a single process/thread, would call it as thread pool
// let assumes that u created one HTTP server on this node process, so its liseaning on a particular port `
// so one node single process, single thread and lisening for the http req
// http req serving the io operation go into the http resp

// do the io operation instruct this file and tell once it done 
// inbetween i am going to serve other clients,  its not like ur doing some file operation
// and waiting for something to be return and  then u will proceed 
// one thread poll that will do the io operation then once u done just invole me 

// one u have done callback function io operation just do to serve,
// meanwhile this io operation going to the other client,
// send req, take req, after take req go to do io operation 
// Inside the main thread main thread is still serving diff client 
// its jobs like take the req delegate the responsibility of io operation is thread pool
// its non-blocking

// web server,php/apache for each of the http req it will initiate multiple req
// this is a multi thread enviroinment but this threads are blocking, something as to be querried from database
// i'ts quarry it wait for until once the query done up client but inbetween serves to diff client because diff threads
// but the point is this blocking u call still serving diff client a blocking operation 

// API writen show that because it is
// var http = require('http');

// // create the server once u will get the http req and it will invoke the function, so this callback is invoke for each of the req
// var httpServer = http.createServer(function(request, response){
//     console.log('client connected');
//     response.writeHeader(200, {"Content-Type": "text/plain"});
//     response.end('webtunings');
// })
// // one req for favicon req
// // it will return http server
// httpServer.listen(8111, function(){
//     // Once this is started, it will invoke the callback
//     // it req again webtunnings
// })

// Node 2

// const http = require("http");
// function callback(request, response){
//     console.log('client connected');
//     response.writeHead(200, {"Content-Type": "text/plain"});
//     response.end('webtunnings')
// }

// var httpServer = http.createServer(callback);

// httpServer.listen(8111, function(){
//     console.log("listening.....");
// });
// the node is running as event loop this callback running executed.

// Node 3,
// TCP server, that will listen on a tcp client 
// this is stream, duplex stream, eventEmitter
// tcp server 
// and this is async wrapper 46 client also going to create server not going to client in this vids
// as a client  u can use any little netcat or telnet

const net = require('net');
const socketUtil = require("./socketutil")

const tcpServer = net.createServer(function (socket) {
    // create server create one tcp server u can give some options like allow half-open of anything in the first arguments but i'm not 
    // we will give just one listener that one going to tcp connect, tcp server is duplex stream, so u can write on the socket so u can read it
    // read/write any data on this socket it goes to the client when u read it basically read from the client 
    // so this is a async model creating the server and waiting for the client req or the client connection 
    // server will get any connection this call back function will be executed, so this is connection listener or callback
    console.log('connection established....');
    socketUtil.socketAddress(socket)
    // this inherit from event emitter, the tcp socket also event emitter, and emit any event like once the socket is ended,closed,distroyed, those cases it will listen for a particular event when
    // when get any data, it will listen for any data event, lets write one listener for data  

    // 4. get connection defined on tcp connection, using this method u can get num of connection
    // tcp connection invoke bcz this connection has been invoke the callback 
    // this is not prop, one method, we need to one callback method bcz this is async 
    // 1. error obj
    // 2. count
    tcpServer.getConnections(function (error, count) {
        console.log("connection like num of concurrent conn or TCP"+count);
        // nc localhost 3394 // client connection
        // so this is very simple utility function to monitor the connection
    })
    socket.on("end", function () {
        // on data will take arguments string or buffer,
        console.log('Server disconnected....')
    })
    // an on is very much similar to browser add event listerner, this is short cut of adding event listener
    socket.on("data", function (data) {
        // set encoding by default this is utf-8 
        console.log("data reci from the tcp client");
        // this is writing on this socket u are reading any data here u have treating as readable stream 
        // treating as writable stream 
        socket.write("Server Reply: "+ data);
        // 5. it can instance of event emitter also emit an event 
        // socket.emit('error', new Error('forcefully emitter...'))
        // this eror event is not handle 
    });
    // 5. error event handle by here 
    socket.on("error", function (error) {
        console.log("something wrong happen here"+ error);
        // socket.end(`Socket sends somemore data...`);
        socket.destroy();
        // destroy won't make any activity any destroy it won't send any data
    }) 
    tcpServer.maxConnections = 1; 
    // can restrict num of tcp client 
});
//func set callback after time duration this function will be invoked 
setTimeout(function () {
    tcpServer.close(function () {
        console.log('server closed')
        // closed on the socket not on the server, the server is still alive
    })
}, 68000)
tcpServer.on('close', function () {
    console.log('Second close event handler!...');
})
tcpServer.listen(function(){
    // random port
    var port = tcpServer.address().port;
    console.log('Server started listening port: ' + port);
})