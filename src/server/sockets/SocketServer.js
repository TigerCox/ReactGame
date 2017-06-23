import { server as WebSocketServer } from 'websocket';
import Player from './Connection';

class SocketServer {
  startServer(server) {
    server.listen(1337, function() { });
    var wsServer = new WebSocketServer({
      httpServer: server
    });

    wsServer.on('request', function(request) {
      this.createConnection(request);
    }.bind(this));
  }

  createConnection(request) {
    return new Connection(request);
  }
}

export default SocketServer;
