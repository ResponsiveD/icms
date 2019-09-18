var maxTime = 1000;

// If input is even, double it
// If input is odd, error
// (call takes random amount of time < 1s)

var evenDouble = function  (v, callback) {
	var waitTime = Math.floor(Math.random()*(maxTime+1))
	if (v%2) {
		setTimeout(function  () {
			callback(new Error("Odd input"));
		}, waitTime);
	}else {
		setTimeout(function  () {
			callback(null, v*2, waitTime);
		})
	}
}

var handleResults = function  (err, results, time) {
	if (err) {
		console.log("Error: ", err.message)
	} else {
		console.log("The result are: "+ results +" ("+time+" ms");
	}
}

process.on('message', function  (m) {
	if(m.cmd === 'double'){
		console.log('hs: I was asked to double ', m.number);
		evenDouble(m.number, function  (err, result) {
			// wrap evenDouble function here, child invokes the msg 
			// in the child proce reg function of the process object, msg invoking the function
			// function going to the get the command obj sending cmd variable, if cmd variable is set to double 
			// going to the lot of the console if us ask to the double even process and we get to answer back we getting to the process again
			// to send a msg back to the parent send the json objec were contain the result 
			process.send({ answer: result })
		});
	} else if(m.cmd === 'done') process.exit();
})