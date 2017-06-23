import http from 'http';
import url from 'url';
import PlayerServer from './boards/PlayerServer';

var server = http.createServer(function(request, response) {
  // process HTTP request. Since we're writing just WebSockets
  // server we don't have to implement anything.
  var page = url.parse(req.url).pathname;

  console.log(page);
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.write('Well Hello');
  res.end();
});

var playerServer = new PlayerServer();
playerServer.startServer(server);
