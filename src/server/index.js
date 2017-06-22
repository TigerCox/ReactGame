var WebSocketServer = require('websocket').server;
var http = require('http');
var url = require('url');
var Boards = require('./boards/boards');
var boards = Boards();

var server = http.createServer(function(request, response) {
  // process HTTP request. Since we're writing just WebSockets
  // server we don't have to implement anything.
  var page = url.parse(req.url).pathname;

  console.log(page);
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.write('Well Hello');
  res.end();
});
server.listen(1337, function() { });

// create the server
wsServer = new WebSocketServer({
  httpServer: server
});

// WebSocket server
wsServer.on('request', function(request) {
  var connection = request.accept(null, request.origin);
  
  console.log("Connection open");
  connection.sendUTF(JSON.stringify({ type: 'open', data: "open" }));

  // This is the most important callback for us, we'll handle
  // all messages from users here.
  connection.on('message', function(message) {
	console.log("Message recieved");
    if (message.type === 'utf8') {
	  // process WebSocket message
	  var data = JSON.parse(message.utf8Data);
	  console.log("Message" + message.utf8Data);
	  switch (data.type) {
		  case "JOIN_GAME":
		    boards.addBoard(function(boardIdentifier) {
				boards.addPlayer(boardIdentifier, function(playerIdentifier) {
					boards.getBoard(boardIdentifier, playerIdentifier, function(board) {
						console.log("Message sent");
						connection.sendUTF(JSON.stringify({ type: 'UPDATE_BOARD', data: { boardIdentifier: boardIdentifier, playerIdentifier: playerIdentifier, board: board } }));
					});
				});
			});
			break;
	  }
    }
  });

  connection.on('close', function(connection) {
    // close user connection
	console.log("Connection closed");
  });
});