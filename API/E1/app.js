const request = require("request");

request('http://www.twitch.com', function(error, response, body){
	console.log(body);
});

// const request = require('request');
// request('http://www.google.com', function (error, response, body) {
// 	console.error('error:', error);
// 	console.log('statusCode:', response && response.statusCode);
// 	console.log('body:', body);
// });