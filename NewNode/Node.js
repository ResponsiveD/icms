// sagalakala321@outlook.com
// sagalakala-saga-32
// SHANTHI@agi

// Node is as an async event driven js runtime, node is designed to build scalable net app.
// where is node.js commonly found?
// Microservice and apis, make a how code is action
// serverless cloud functions, fast and load up lower mem consumption, capable engine this type of apps
// command line app, u just need build, deploy complex apps chances are running in nodejs
// v8 engine used for js support, libuv for async io and event loops,
// History later

// Async is each incomingreq allocated a process, eaither from pool or existing process or new one is forked in res to the req
// handling multiple req simultaneously, running many proceses each still and each still handling one req at a time 
// code running in each process effectivily isolated and unaware of the other req being handled simultaneously. 

// Multi-Threaded, here single process may have pool of many threads each responsible for handling coming req
// code running each model while isolated to a single thread, may be aware of other concurrent req especially there accessing shared mem 

// Node aware of use event loop in a single-threaded model. Node does run multi threads to do its work. 
// cuz js running in nodejs operates as the all incoming reqs are being handled via a single thread in a single process.
// these sg thread model simultineous access to shared memory, but there is also but there is also isolated bw process req 
// all running the same code, process, event loop. 
// Most Node.js app is centered around the event managed by event loop 
// event loop notified when a req to open a file has been has been fulfilled by the os sys. Network incoming http req, will also fire an event. Timers can even trigger events at some point in the future, which are also handled by the event loop.
// these features surfaced in ur app by  reg callback func which node will invoke when a specific events arise
// just one func in ur code running at any one time. that's why i mentioned single-threaded
// many incoming http req each of which invokes ur callback func, only one of those callback funcs will be exe at a time
// "if code spend too much of time on any one task, the event loop is effectively stalled and wont invoke any other callbacks until ur work is complete"
// the fair treatment of clients is thus the responsibility of ur app, block to thinking async

// Traditional "Synchronous" Programming
function serveCustomer(customer){
	let order = customer.placeOrder(menu);
	let food = cook.prepareFood(order);
	let tip = customer.eatAndPay(food);
	return tip;
}
// cust may be send own pro, thread, ur app code may not even need to 
// aware of this, simply does not work, function and block of sta will prevent anything else form happening. look like synchronously

// collections of function think react to events, which invoke to work will call future event to be fired
// when custo let us know he read to order and then cook let us know order going to prepare, otherwise we happily waiting for new cust

function serveCustomer(customer, done){
	// serve and finished invoke the customer passing new as the 2 parameter 
	// customer finished immediatly return and future done function will execute
	customer.placeOrder(menu, (error, order) => {
		cook.prepareFood(order, (error, food)=> {
			customer.eatAndPay(food, done);
			// will not do any error checking in this example 
			// it seems like nested new to node, called christmas tree problem
			// these is reduce the cognitive approuch 
		})
	});
	// this is same ex function written using promises, onthing that know is that function expect callbacks and inheritly interchangable which function return promises 
	return customer.placeOrder(menu)
			.then(order => cook.prepareFood(order))
			.then(food => customer.eatAndPay(food));
	// we finally represent linear process and seq of statements
	// anti-pattern first demonstrated. however this models still alow us to many cust simultenously

// A Node extend the idea of the js from the browser to the server, they also introduce the new concepts build on event loop and async prog concepts, 
// the first is an event emitter. This is a simple js class that has a handful of methods the most critical being emit and on
// the idea u can instanciate an event emitter and then define multiple callbacks to be invoked when a particular named event is emitted 
emmitter.on('data', (msg) => {
	console.log(msg);
});

// and we can call event emitter's eimt function, passing in the type of event and event payload 
// in this case event emitting paloads cause that text to be written to the console. 

customer.on('decided', order => { //eventEmitters
	order.on('prepared', food => customer.eatAndPay(food))
	cook.prepareFood(order);
});
// with overall function event emitter is same, we passed customer and a callback function. now though our customer extends the event emitter class 
// so regestering callback for the "decided" event. that event payload includes the order, which also an instance of event emitter, so reg another callback when the order emit a prepared event. 
// now that we know what want to do when the order is prepared, we can ask to cook to prepare
// so far what we what we want to do when the customer has decided on their order. Now we need to specify what to do when the customer emits the leaving event. finally with all  of our event callbacks reg, we can give the menu to the customer and wait for them to emit a decided event. we spend most of this code specifying what we want to do when and finally kick off at the bottom by calling placeorder. 
// with adv promises and async/await finally as not like this on your own; howeven build on event emitters, its important atleast know event exist. 
}

// Streams
// dealing with streaming data in node.js while async prog model and the underlying event loop u may never need to be stream of your own, it's difficult to do nodejs without using stream in some way. Streams are broken down into broken down three broad types; 
// readable streams, writeable streams, Duplex, Transform

// all Streams extends event emitters an therefor emit certain events 
// they also have events: methods: properties of thier own.
// A readable stream emits events like reable, data, end and error
// methods: read, pause, resume, destroy
// props: readable, readableLength
// stream have methods of combination to support back pressure.

// For data arrive for underlying resources, a file or network, for ex
// the appropriate events are emitted to let u know u can read from the stream,
// if u are reading from the stream more slowly then the underlying data is arriving, the stream eventually reach a high-water mark, and 
// and the stream was result to the underlying resource that it can no longer recive any data,
// Later, once enough info has been read from the stream, it will begin accepting data again while the reader continues to read from the stream.

// write stream just in the opposite direction
// events: drain, close finish error
// Methods: write, destroy, end 
// Properties: writable, writableLength
// writable stream faster then underlying resource can process it, high-water mark will be reached and u will be preventing from writing to the stream until appropriate event emitted indicating that its safe to do 


// one of the best steaming is pipeing. coz readable and writable streams both have a consistent interface for applying and coping with back pressure, u can pipe a readable stream to writeable stream, and the back presure communicating one stream back to the other 
// ex
// readablestream read from disk pipeing a stream to writable stream that responding a web req in this case it's likely ur readable stream will read data faster then the writable stream can send that info across the network, so back pressure will kick in. 
// the readbalestream will slow down and won't overwhelm the writable stream. 
// Another ex
// would be receving an http upload via a readable stream and writing that info to disk using a writebalest. This stream approuch really great when u don't need the entire contents and memory at once. you can process the info throw the pipeline of streams once chunk at a time, all without interrupting the event loop.
// the fact all async under the hood means that we can use this to handle many simultenous req.

// Streams show up in the node.js api in several places. files can be read from and written to the file system using fs.ReadStream and WriteStream, respectively. Node's HTTP support also relies heavily on Streams for sending outbound client req, as well as processing incomming req and sending resp. 
// we hav't havily taked about duplex transform streams, one ex transform stream can write to as a writeable stream, and that will gzip the contents and make compressed data accessible as a readble stream

const server = http.createServer((req, res) => {
	res.setHeader('Content-Type', 'text/plain');
	res.setHeader('Content-Encoding', 'gzip');
	fs.createReadStream(path.join(__dirname, 'lorem.txt'))
		.pipe(zlib.createGzip())
		.pipe(res)
		// it is all of this using streams, we can pipe these together as we like, so long as we start with a readable stream and end with writable stream
		// one callback event emitter and stream that lagecy approach found in most of the node.js APIs
		// using them promise, async/await, as of this writing anyway, is not particularlly straightforward. I fully expected to improve over time u likely to not work too hard to try to combine them if you can avoid
});

// Modularizing a Node.js app
//another project of almost any size will benefit from having its code organized into a collaction of smaller files rather than just leaving everything in one big file. 
// ex: the code for the waitress, cook, customer are in three seperate files. In cook js function called prepareFood a line that begins with
// cook.js
const ingredients = "stuff";

const prepareFood = (order, done) => {
	// prepare the food
}

module.exports = { prepareFood }
// and a line that begains with module.export here are defining a js obj with one propery
// export funciont preparedFood, anything this file ingredients const cannot be accessed outside of this module. effectively making it a private variable. 

// customer.js
const moment = requre('moment')
class Customer {
	// methods and properties
}

module.exports = Customer
// waitress.js

const cook = require('./cook');
const Customer = require('./customer');

// importing a Customer class, we name that vari with a capital,we'll likely end up calling new Customer knowing and assinging that to a lowercase
// cook on the other hand contains a function we'll be accessing directly, so we'll import that into a low vari, it is just convention, doesn't have any effect how the code actually funcions. Another with the each fixed file name with relative path 

// npm
// it really 2 things 
// 1. package repository, u can download add add t3 party modules to ur node project. 
// 2. also cmd line application install alongside node itself , which u can use to manage aspects of ur node project.
// npm init, running this command is a good way to bootstrap ur project and create a basic package json file it is central location for a project metadata, this file give ur project its identity, and while u can create it by hand, npm init is a much easier way to make sure you get all the props named correctly from the start. 
// common npm command used to add dep to ur project, like moment example will download a module from the npm package repository and install it alongside ur project code in the node_module dir 
// adding save parameter here the package.json file to indicate that this module is now a dependency of the project
// moment add to runtime dependency, as a moment pack require for our app to run
// another type of dependency is development dependency 
// this modules are used during a project's dev phase. 
// ex of testing and packaging 
// here we adding the mocha test, notice that this adds mocha to a seperate devDependencies section of our package.json
// Having these dep recorded in package json means that we don't need to check them into source control with our own code. When a new devloper or build server that not a matter, checks out our project with our pj from sc simply while running npm install with no additional parameters will download a copy of all our projects third-party modules 
// modules may have dep of their own, we are really downloading the entire tree of deps necessary for our proj This is often like iceberg. We may req very few modules our selfs the part of the iceberg above the water, but the net effect many deps our projs, the much larger part of the icebarg under the water 
// exp

"devDependencies": {
	mocha: ""
}
"dependencies": {
	moment: ""
}
// actually occur 180 module along ur code
// npm has de facto CLI Managing the Node app dependencies
// it leaverages like npm package repository d/u dep 
// In frontend development and Use node based tool for testing, its very likely that the same tools can be used to test ss node proj as well

// Mocha -> In this case run ur mocha cli to run ur tests, all over test tools use mocha, but certainly do not require it.
// BDD interface, we can group our test using the provided describe and it functions, writing the test itself in the callback,
// this callback function as a parameter, which we've called done here. we need to invoke done func when our tests are complete.
// node using assert module in basic test arretions. However, this is where our next module comes in. 
describe('a cook', () => {
	it('should prepare food', done => {
		let order = 'pizza';
		cook.prepareFood(order, (error, food) => {
			assert.equal(food, order);
			done();
		})
	})
})
// chai is an assertion lib that provides in wide ranging selection of assertions designed to make design to ur test more readable.  

describe('a cook', () => {
	it('should prepare food', done => {
		let order = ['pizza', 'wings', 'hotdog'];
		let customer = new Customer();
		customer.placeOrder(menu, (error, order) => {
			expect(order).to.be.oneOf(menu);
			done();
		})
	})
})
// notice that chai has a very readable, fluent api that makes the assertion itself very obvious, for in this case our expect order one of the items in the menu array. The 3 tool in our testing suite is 
// Sinon which is a frmw for spies, stubs, and mocks. This lib helps us isolates the code were testing by mocking the things 
describe('a waitress', () => {
	it('should serve a customer', done => {
		let stub = sinon.stub(cook, 'prepareFood')
			.callsFake((error, done) => done('pizza'))
		waitress.serveCustomer(new Customer(), () => {
			expect(stub.calledOne).to.be.true;
			done();
		})
	})
})
// served cust, in this case we don't want to call real cook, so will create a stub to replace it, now evetually actual function didn't do a whole lot more that this, but if this was, say a call to a db, mocking it here would make it much easier to test func. sinon also makes it easy to tell if the stub was called and, if so how many times. Here's the calledOnce prop, which we can assert using our fluent assertions. 
// The last tool in our test suite is Istanbul, which provides code coverage. The CLI for this tool is called nyc, and using that to measure the coverage of our tests is super simple. Here u can see that we have complete coverage over cook and customer, but not so much with waitress. We're given the exact line number that haven't been tested so we can go back and figure out why. These 4 OS tools, when combine together, have been great tools in my testing tool belt.

// Node.js is js on ur backend server, before node that was not a common easy thing to do.
// js was mainly a frontend thing, coz node offers a lot more than exe js on the server. In fact the exe js on the server is not done by at all, its done with a virtual machine, vm like v8 or chakra. Node just the coordinator, it's the one who instructs a vm v8 to exe ur js, node better defined as a wrapper around a vm like v8. 
// once u run js in vm node will pass u to v8, v8 will exe that js and tell node wat the result is and node will make the result available to you. That's the simple story. But Node is a bit more useful that just that. Besides the fact that enables us to exe js on a server, which is done through a seamless integration with v8, Node comes with handy built-in modules providing rich features through easy to use async apis. 
// Why Node
// Besides being an easy way to exe and work with js on the server (Wrapper around V8).
// Build-in modules (fs, http, crypto, zip, ...), makes it a great plat for tools, not just a plat to host backend servers.
// async apis(no threads), all of them offer async APIs that u can just use and not worry about threads. Yes can do async prog in Node do things in parallel, without needing to deal with threads, which is probably the biggest benefit of using a runtime like node, And if the build-in packages were not enough for u, u can build highly performing packages using c++. Node is js, but it has first class support creating dynamically linked shared objs that u can use directly in Node. Of course u can also write ur addons in js too if u .
// node ships with debugger, which I'll show u how to use in the last module of this course. Node also has some handy generic utilities that enhance the js lang and provide extra APIs to work with, datatypes for ex
// and we are not done in fact these last 2 points on this side 
// why react deve love node, node is platform for tools, has lot of options u have so many tools out there, coz Node was the first major js exe engine that ships with reliable package manager, which is called npm. We did not have a package manager for long time in the js reliable pm which comes with CLI makes it really easy to install third party packages and, in general, share ur and reuse ur code, npm registry, where the packages get hosted, has so many options, and by free tool install and use in ur system
// why named node, actually build small building blocks, nodes, that can be organized good networking to have them communicate with each other and scale up to build large distributed progs. Scaling a Node app is not an afterthought, its build right in 
// --> Hard Coding Concepts Explained with Simple Real- life Analogies
//  callback
// A function that node will "call back" at a later point in the time of a program
// we call the function a callback function if node will call it back for us at a later point in the time of the program. this is done through an async method. Here's the simple callback function, which usually receives data as its arguments, and we just pass its ref here to some async method, and that async method will get the callback invoked when the data is ready. I have another anology for u
// --> Async Prog as seen at Starbucks
function cb(data){
	// do something with data
}

someAsyncMethod(cb);
// about callback. When u order a drink from starbucks, in the store, not in the drive-through, they'll take ur order and ur name tell u to wait to be called when ur order is ready. awhile they call you name and give you what u asked for. That name you gave them is the callback func here. They called it with the object that you req, the drink. So let me modify this generic ex of a callback to demonstrate the starbucks ex. The during ur starbucks order. Its' a function that will be called with some data which is ur ready drink. When u place ur order, that's an asyc method coz ur order will take sometime and they don't to block the order in queue while ur order is getting prepared, that's why they'll call u back. an that is the pattern of callback
function Samer(readyLatte){
	// drink readyLatte..
}
starbucks.makeMeLatte(Samer);


/// node started adopting another pattern for async prog which we call promises. And a Promise is a little bit diff than a callback. To understand promises. I imagine that u asked someone to give you something, but they give you something else, call it a mystery object might eventually turn into one of two possible forms, one form is associated with succ and the other with failure. This is like if we ask a 
// if we ask chicken of chik us an egg instead. That egg might succ trun into chick or it might die and be useless. 

// free commands availably globally in ur sysm, 1 the node comm itself if which u run it without any arguments u will get this interactive prog where u can type and exe js. Here's quick test of how modern ur Node is. I typed the test of node capabilities, MJS module
(async (a=1, ...b) => ({ ...b, a,[a]: `${a}` }))();
util.promisify
require('fs').promises

// if u ty in node command without a script for it to exe, Node will start REPL session. REPL stands for read, eval, print, loop and very convineant way quickly test simple js and node comms.  
// _ similar to $ sign in bash, it stores the last evaluated exp. For

> Math.random()
0.6620561379952141
> _
0.6620561379952141
> require('fs').promisesc
undefined
> _
undefined
> const random = _
undefined
> _
undefined
>


// require prog u used to manage the dependencies program, this module has creating web server, there many other lib u can create a webserver 

const http = require('http');

const server = http.createServer((req, res) => {
	res.end('Hello World\n');
});
// create a web server and it accepts an argument that known as the req listener. this is a simple function that node will invoke every time that the create web server. This fun is also callback, but this term is a bit old at this point. 
// arg as listener. This server will listen to req and it will invoke the listener func for each req. why this listener func recives the req object as an arg. other arg response object, its the other side of a req connection
// create server only create, not activated, if want u can use listen function, using OS port
server.listen(4242, () =>{
	console.log('Server is running...');
})

// Timers
// Some of the popular function is the setTimeout and setInterval
// Node api has the function and it exactly matches the browser's api
// these timer fuction can be used to delay or repeat the exe of other function which receive as args. 
setTimeout = (
	() => {
		console.log('Hello after 4 seconds..');
	},
	4 * 1000
);
// 1 arg set timeout while the execution will be delayed, node pasuse the 4 sec and reading after that 

const func =
	() => {
		console.log('Hello after 4 seconds..');
	};

setTimeout(func, 4*1000);

// fuction can be use that before setTimeout
// for: func(arg1, arg2, arg3, ...)
// We can use setTimeout(func, delay, arg1, arg2, ...)
// function have args 1,2,3 and more then remaining args setTimeout to pass these args to the delayed function once its exe with settimeout. 

const rocks = who => {
	console.log(who + 'rocks');
}
setTimeout(rocks, 2*1000, 'Pluralsight');
//  the rocks function, which is delayed by 2 secs, accept a who arg and our settimeout calls relay the value pluralsigt as the who argument

const theOneFunc = delay => {
	console.log('Hello after '+ delay + ' seconds')
};

setTimeout(theOneFunc, 4*1000, 4);
setTimeout(theOneFunc, 8*1000, 8);
// this way what msg based on whatever delay we pass to it, oncefunc the 2 setTimeout calls 
// one that fire after 4 secs soon
// both of this called third args, settimeout for delay arg for theonefunc

// what if i asked to print msg in every 4 secs forever? while u can put setTimeout in a loop. Node offers the setInterval as well, which would accomplish exactly that. Just use setInterval instead of setTimeout,
// a call to the timer using the timerId and u can use it with a clearTimerout call to cancel that timer.

var timerId = setTimeout(
	() => console.log('You will not see this one!'),
	0
);
setInterval()
setImmediate()

clearTimeout(timerId)
clearInterval()
clearImmediate()

//

setTimeout(
	() => {},
	500
)
for (var i = 0 - 1; i < 1e10; i++) {
	// block node sync
};

// we block Node sync with a big loop. this is 1 with 10 zeros in front of it, basically in this situation busy cpu of course very bad thing to do 
// but it'll help u here to understand that setTimeout delay is not a guaranteed thing, but rather a minimum thing. This 500 ms here means minimum delay of 500 ms. In sys will take lot of time longer to print 
// it will have to wait on the blocking loop

// print "Hello world"
// Every second
// And stop after 5 times

// After 5 times. Print "Done" and let Node exit.

let counter = 0;
const intervalId = setInterval(() =>{
	console.log('Hello world!');
	counter += 1;
	if (counter === 5) {
		console.log('Done');
		clearInterval(intervalId);
	};
}, 1000);

// http://jscomplete.com/ng/1

// So far we used the node command in 2 modes, to start a REPL with no arguments, and to exe a script by using a single file path arg. The Node com which often called the CLI, also has options which make it work diffly. 
// we will see later this one --CLI interface on video agilan

// Process Object
// command custm env variables, ex we can do something like VAL1=10 VAL2=20, note
// we can access the value in enviroinment vars using the process 
// we will see later this one "process Object"
// console.log("Current user is"+process.env.USER)
// console.log("\nScript executed with: ")
// console.log("VAL1 equalt to:"+process.env.VAL1)
// console.log("VAL1 equalt to:"+process.env.VAL2)
// in the node script access the value in env varibales using the process object which has many properties but one day we use purpose end property available through the os, like user here, it also includes the one we just customized, like val1 and val2. u can export env varis prior to exe the script and node will read those as well. 

// this is handy bridge bw the operating system and the node process. u can use it to communicate dynamic config values. 
// Ex script to run on dev port 4242, but production run on 80 instead, u can use process.env to make the port dynamic and control it on the diff machines 
// alt way node process process.argv have items for every positional argument u specify when executing the node script in order. for 
 // node -p "process.argv" hello 42
// [ 'C:\\Program Files\\nodejs\\node.exe', 'hello', '42' ]
// another props standards are 
// stdin, stdout, stderr, these process node communication bw node process and os execution environment. 
//  console.log("hello");
// hello
// undefined
// > process.stdout.write("hello\n");
// hello
// true
// > std input, to read the information

// process.stdin.on('readable', () => {
// 	const chunk = process.stdin.read();
// 	if(chunk !== null) process.stdout.write(chunk);
// })
// just use the events and method to use this streams, in here we are using the readable event and here using it to read a chunck of data, and then we print, same to stdout

// process.stdin.pipe(process.stdout)

setTimeout(() => process.exit(), 2000);

process.on('exit', () => {
	console.log("Process will exit now. See you later!");
})
console.log('Hello!')
// write before node exits, it will print out the message. coz of nature async code in node, this hello line execute first fire. coz event base methodology.


// JS is a diff language Ecma script which is offical specification JS
// ecma script tech communitee known as TC39, makes yearly releases of ECMA  and JS engines, like follow as new features introduced in the ECMAScript 

// var vs block scope
// these are nested block scope 
> {{{}}}
undefined
> {{{ var a=42 }}}
undefined
> a
42

{
	// block scope
}

if(true) {
	// Block Scope
}

for (var i = 1 - 1; i >= 0; i--) {
	// block scop, we can access the var in outside this is y use let key
};

function sum(a, b){
	// Function scope
	var result = a + b;
	// don't leaks out of the function
};

sun(4+3)
// block scopes are diff then function scopes 
// there is no leak out the function if u can access that outside of the scope u cant, if u access the block scope outside is a bit problematic. 

// we use const ref assigned is meant to be constant coz ref assigned with const cannot be changed but not values here, const does not mean immutability, it just means constant ref, but if the ref is for an obj, we can still change this obj, just like we can do with functions that receive objs as arguments. So if the 

// Scalar values
const answer = 42;
const greeting = "Hello";



// little bit weird.
// arrow function behaves more predictably with closures. arrow function does not care about call it, while regular func cares very much about that. 

// X always bind the value like this keyword for its caller, and if it didn't have an explicit caller regular use a value of undefined for its this keyword. An arrow function, on the other hand, like Y here, not caring about who called it, will close over the value for the this keyword for its scope at the time it was defined, making it great for delayed exe cases like events and listeners coz it gives easy access to the defining env.
const X = func() {
	// "this" here is the caller of X
}

const Y = () => {
	// "this " here is not the caller of Y
	// its the same "this" found in Y's scope
}

// "this" here is "exports"

this.id = 'exports';

// console.log(this);


const testObj = {
	func1: function() {
		console.log('func1 :', this);
	},
	func2: () => {
		console.log('func2 :', this);
	},
}
testObj.func1()
testObj.func2()
// this is the big benefits working with listeners an nodejs

// Object Literals
const mistery1 = 'answer';
const PI = Math.PI;
const obj1 = {
	p1: 10,
	p2: 20,
	f1() {},
	f2: () => {},
	[mistery1]: 42,
	PI
}

obj.mistery
// coz it is dynamic syntax, obj are very popular in js they are use manage and communicate data, and using these features will make the code a bit shorter and easier to read.

// Destructuring works both arrays and objs 

// const PI = Math.PI;
// const E = Math.E;
// const SQRT2 = Math.SQRT2;

const { PI, E, SQRT2 } = Math;

// also works inside function arguments 

const circle = {
	label: 'circleX',
	radius: 2,
}

const circleArea = ({ radius }) => (PI * radius * radius).toFixed(2);
// it generally use readablity of function, it accept object as its arguments
console.log(
	circleArea(circle)
)

const [first, ...restOfItems] = [10, 20, 30, 40];

const data = {
	temp1: '001',
	temp2: '002',
	firstName: 'John',
	lastName: 'Doe'
};

const { temp1, temp2, ...person } = data;

const newArray = [...restOfItems]

const newObject = {
	...person,
	newArray
}

// Most of the function that you'll be working with in Node return promises, and you'll have to consume them using the promise syntax with .then and .catch. however, a more preferable way to consume promises is using the new async/await syntax, which make promise makes your code bit more readable easier especially u start dealing with loops and other complexities.

const https = require('https');

function fetch (url) {
	return new Promise((resolve, reject) => {
			https.get(url, (res) => {
				let data = '';
				res.on('data', (rd) => data = data + rd);
				res.on('end', () => resolve(data));
				res.on('error', reject);
			});
		})
}

// fetch('https://www.javascript.com/')
// 	.then(data => {
// 		console.log(data.length);
// 		// which will expose the data after the async action.
// 	})

// alt u can promise using the async/await feature as seen here. We use the keyword await before the promise and that will give us access to the data available after the async action. We can use this data directly which is a lot simpler than callbacks and using. then as well. However, to make this await feature work, u have to wrap ur code with a function labeled with the async keyword and then call the function to exe the aync action. Testing this code now, the same fetch promise 
(async function read() {
	const data = await fetch('https://www.javascript.com/');
	console.log(data.length)
})();

// why NPM?
// developers to do three main things, 
// share code with other developer, 
// re-use their own code across projs,
// use code written by others 

// code sharing, composability, team work, versions
// see later npm code






// In this module, concurrency
// Require module using require objects
// executions of many things in once without using any threads

function dynamicArgsFunction () {
	console.log(arguments);
}

dynamicArgsFunction(2,3,4,5);


// Module, waht exactly in module
// A file folder that contains code

// Node actually does not just execute the file as that wrap the file with a function 
// This is something that u need to remember, so let me show you what i mean.
// arguments acess the args inside a function, 
// file here keyword all args pass into this function, regardless of how many of them passed to it. So if I exe this file 2 args under this folder 
[Arguments] { '0': 2, '1': 3, '2': 4, '3': 5 } -- dynamically args
// 1. args keyword, 2. all the args

// console.log(arguments) --> here geting the node job function,
// But node has diff story coz, node internally wraps every file it exes with a function, this console 

[Arguments] {
  '0': {},
  '1':
   { [Function: require]
     resolve: { [Function: resolve] paths: [Function: paths] },
     main:
      Module {
        id: '.',
        exports: {},
        parent: null,
        filename: 'C:\\Users\\is7338\\Documents\\NewNode\\index.js',
        loaded: false,
        children: [],
        paths: [Array] },
     extensions:
      [Object: null prototype] { '.js': [Function], '.json': [Function], '.node': [Function] },
     cache:
      [Object: null prototype] { 'C:\\Users\\is7338\\Documents\\NewNode\\index.js': [Module] } },
  '2':
   Module {
     id: '.',
     exports: {},
     parent: null,
     filename: 'C:\\Users\\is7338\\Documents\\NewNode\\index.js',
     loaded: false,
     children: [],
     paths:
      [ 'C:\\Users\\is7338\\Documents\\NewNode\\node_modules',
        'C:\\Users\\is7338\\Documents\\node_modules',
        'C:\\Users\\is7338\\node_modules',
        'C:\\Users\\node_modules',
        'C:\\node_modules' ] },
  '3': 'C:\\Users\\is7338\\Documents\\NewNode\\index.js',
  '4': 'C:\\Users\\is7338\\Documents\\NewNode' }

  // exactly five arguments Node passed to that hidden wrapper function when it executes your files. u should remember that every time your hear the word module. This is not just a file, it's a function that receives args and it will also return something. Internally to this file wrapper here basically

  // function (exports, module, require, __filename, __dirname) {
  	let a = 1;

  	// body...
  	console.log(arguments)

  	exports.a = 43;
  	return module.exports
  // }(module.exports)
  // have u used any of this arguments before in your node file? export or module exports to define the API of a module, you can use require to require other modules inside this one and filename has the path of this file, and the dirname has the path to the folder hosting this file. All of these all of these file are not global objs. They are just args to wrapping func. They are cust for each file, and they diff in each file
  // every file it will retun module node will manage the dependencies manage the apis of modules. 

  // a = 1 not a global variable at all it's just var inside a function. The scope of variable hidden wrapper 
  // Browsers do not have this hidden wrapping func. so when u define a variable like this in a browser in a script, that variable will be global. It will be available to all the script u include after defining it, coz u basically u putting it on global scope. But that's the browser, not Node. Node has the wrapping function. this g here is not global at all . It's

  // arguments inside of any file, the wrapping func also internally return something. And the thing return module. exports prop. This is what that built-in wrapper function return by default, all the time, for every file it will return module.exports And 'module' here is just node always ret the module, the export obj here is just an alias for module.export node invoke the wrapper function it simply exports the module. exports here as the value of the first arg. This is why we can use the exports keyword itself to export a new popr on the api

  // Node has started on OS process, and finish the process os terminate the pro node proc not keep running in background unless it has a reason to not really node process a reason to continue running. Let's now give the proc reason to continue running we can do so by starting an internal timer. 

  // Global Object's
  // if Defining variable in the top level its not global one yes u should avoid doing taht 
  // console.log(global, { depth: 0 })

  // Event Loop
  // What Node uses to process async actions and interface them for you so that don't have to deal with threads
  // will take care of anything async for u don't have to worry about working with threads. In other langs if u need to do async work, u have to manage thread ur self , asunc work inside ofthem monitor them, don't access shared data to make sure that there are no race condition, big winner is domain is node coz u just use Node's api, and event loop do all the heavy lifting. The Event Loop is just a simple infinite loop that's built inside node and it is main task is monitoring async opetions that need to be run and figure out to be ready to consumed. 

  // Event loop will monitor the setInterval timer, every 5 secs callback function to v8, and v8 will exe what's inside the function. Because this is process going continue forever
  // node is running if i go to the another terminal ps -ef to list all the running process and pipe that output of this command on grep

  // ps -pf | grep node
  // once the proces has done the event loop exit the node and OS also terminate the node process

  // errors vs exceptions
  // errors is a simply a problem, so apps should not really should not catch that prob, they should just let it happen, while an exception is a condition, and applications usually catch that condi and do somthing with it. Lets talk about that in Node. In the 

  const path = require('path');
  const fs = require('fs');
  const files = ['.base_profile', '.npmrc'];

  files.forEach(file => {
  	const filePath = path.resolve(process.env.HOME, file);
  	const data = fs.readFileSync(filePath);
  	console.log('File data is ', data);
  })

  // loop over the array of files, that acual file have in home dir and they might be 

  // it will be crashed althought this process started the infinte event loop to do async actions, it it immediately stop that loop when it encounted this unexpected erro. And the code did not accout to possibility of error. We can make this code account for account for error by simply makin an exception for it. we write code to represent this exeception. So let's assume that trying to read a file that does n't exist is not really a problem for this code. we going to upgrade from this prob into a condition which is an exception. And the easiest way to do that is throught a try/catch statement, so if u look at the second file under this 
  files.forEach(file => {
  	try {	
	  	const filePath = path.resolve(process.env.HOME, file);
	  	const data = fs.readFileSync(filePath);
	  	console.log('File data is ', data);
  	}catch(err){
  		console.log('File not found')
  	}
  })

// but it is alsof dangoerous one we attempt to read them, but it also means we are ok with any errors when u reading file not being found. ex file is founded but corrupt data, we'll treat that other error exactly the same, making the console.log, this is the safest way to ignore the process

files.forEach(file => {
  	try {	
	  	const filePath = path.resolve(process.env.HOME, file);
	  	const data = fs.readFileSync(filePath);
	  	console.log('File data is ', data);
  	}catch(err){
  		if(err.code === "ENOENT")
  		console.log('File not found')
  	else throw err;
  	}
  })

// Node Clusters
// Normal thing for a Node process to crash and exit and we  should definitely let it do so. How is this going to be an acceptable thing in production? Remember y is named node cuz don't run a single node process in production. You run many One working process existing should not mean should not mean the sys is down. You should be running a cluster of node procs.

// And that cluster should be have master process should be monitoring ur app worker processes. This is true event if even running on single server. It's often the case where prod servers will have many cpu cores. u should be running a node node process each core. if ur not running cluster in that case u are not really utilizing the full power of your machine. And even if ur single production server has a single core, u should be running a cluster anyway that cluster has the simple job of monitoring the actual node process and starting the new one when proc exists.  

// Async pattern
// Node originally using callback pattern for everything async. Node is changing and its incrementally adopting other patterns as they surface in the js itself. 

const fs = require('fs');
const data = fs.readFileSync(__filename);// sync method the node available to read file
console.log('File data is ', data);
console.log('TEST');

// let start with once sync this is the pattern usually used in other prog environments. Slow actions are usally handled with thread directly and the code does not have any patterns to consume data coming from these slow actions. You can do that as well in Node. u don't need any pattern to consumes its data u get the data when u call that method, 
// and whole program does not gothrough the event loop we directly using the OS sync file readin api. When u exe this before the console.log line test, coz all sync.

// Now look at the 2 callback pattern file this one using the read file method from the build-in fs module. This method is async It needs to the gothrough the event loop. We can't access the data directly after calling this method. This is why node came up with this callback pattern where the last argument of any async func, like readFile here is itself a function, which is known as a cb function. this is always the last arg of the host func. The event loop will make this callback exe when the operating, while the cb always receives the err obj as its first arg. The data comes after that second argum and sometimes in many arguments after that. This first error argu is standard in the node idiomatic callback pattern. which is why it's that pattern is often reffered to error first callback pattern. If there is an error in the code, the error-first argument will be error object. And if there is no error in the code, this first arg will be passed as null. 

const fs = require('fs');

fs.readFile(__filename, function cb(err, data) {
	console.log('File data is ', data)
});
console.log('TEST');
// basically the event loop was the 2 iteration of the event loop. The first iteration exe readFile itself and the console test line and the first iteration defined the callback function and also same iteration node will be ask the OS for data. Later on when the os is ready with data, and this could be a few sec later the event loop will go through another iteration where it will now invoke the callback function and exe console on line 4 here. This callback pattern is good, but limited, and it introduces some complexities and inconveniences. One famous incon cb that fact that we need to nest them inside each other if we re to make asyc actions that depend on each other.


fs.readFile(__filename, function cb1 (err, data) {
	fs.writeFile(__filename, '.copy', data, function cb2 (err) {
		// body...
	})
})

console.log("TEST")

// prymid of doom and its not ideal. it makes the code harder to write, read, and maintain. Luckily, since 
// primisify as well

const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

async function main(){
	const data = await readFile(__filename);
	console.log('File data is ', data);
}

main();
console.log('TEST');

// able to consume this promise using a/a features. u can promisify any async action that's depend according to code that ideamatic callback pattern,
// node also shift first level support arguments support for promises in some modules as well. This fs module is one of them. u don't really need to use the promisify func here, u can just use the native promises returned by the fs module itself. 
const { readFile } = require('fs').promises;
// by doing so u can get promise based read file out of the box, and u can consume it with the async/await as we did before. How cool is that. This is the near future of all od Node's APIs. Promises are better then callbacks The code is easier to read here and promise open the door to so much flexibility to nest operation and evet loop over them. 


const fs = require('fs').promises;

async function main () {
	const data = await fs.readFile(__filename);
	await fs.writeFile(__filename+'.copy', data);
}
// this wait on read file and write file, just wait line by line there is no nesting going on here that whould make code lot deal with
main()
console.log('TEST!!')

// Event Emitter
// and its important one so let's talk about in it 
// so most of the event module implement the EE module. EX streams, Node are EE the stdin stdout both event emitter as well after requireing the event emitter class we create EE obj, let me put it in My emitter the new keyword on the EventEmitter class 

const EventEmitter = require('events');
// MyEvent to emitting events 
const MyEvent = new EventEmitter();
// An event emitting object has many methods, but here are the 2 most important ones. u can emit a string, This string is a name that can be anything and u can use it to identify a certain event. So let's emit a TEST_EVENT string here. Now, the other method on any emitter whether u can subscribe emitted by this object, and u do that using .on method. You say myEmitter.on this TEST_EVENT string, and then you callback as a second arg.
setImmediate(() => {
	MyEvent.emit('TEST_EVENT')
})

MyEvent.on('TEST_EVENT', () => {
	// The myEmitter object will invoke the callback function every time the event represented by this string is fired 
	console.log('TEST_EVENT was fired')
})

MyEvent.on('TEST_EVENT', () => {
	console.log('TEST_EVENT was fired')
})

MyEvent.on('TEST_EVENT', () => {
	console.log('TEST_EVENT was fired')
})

// MyEvent.emit('TEST_EVENT')

// .on method in multiple this gives flexibilty of behaviors in diff functions in res to a single event. zero o/p we subsribe 3 times the subscribe will not fired here it was emitted once before emitted once before we subscribed, but no one was listening at the point. If u emit the event after subs u should now see the 3 callbacks executed 

// --- q2 if don't emit event after the subscription that I just did, and I just keep this line here, what can i emit to make the subscribers callbacks that happened after it, without moving it to after the subscribe calls?
// I can use the Event Loop, I can delay the exe of this line to the next tick of the event loop by using a simple setimmediate call, for ex 
// So  these subs calls will happen before the emit call in the case and we see the "TEST_EVENT" was fired message this is event emitting very simple and very powerful because it allows for modules to work together without depending on any apis. 



