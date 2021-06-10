//const http = require('http');
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
console.log('сервер запущен');


// wss.on('connection', function(ws) {
	
// 	let counter = 1

// 	setInterval(() => {
// 		counter++
// 		ws.send(counter)
// 	}, 1000);

// 	ws.on('message', function(message) {
// 		console.log(Number(message) ** 2);
// 		ws.send(Number(message) ** 2);
// 	});

// });


wss.on('connection', function (ws) {

	ws.on('message', function (message) {
		
		ws.send(Number(message) ** 2);
	});

});