
class Connection {
  constructor(request) {
    this.connection = request.accept(null, request.origin);
    this.connection.on('message', function(message) {
      if (message.type === 'utf8') {
        try {
          var data = JSON.parse(message.utf8Data);
          this.onMessage(data);
        } catch (e) {
          this.onError(e);
        }
      }
    }.bind(this));

    this.connection.on('close', function(connection) {
      this.onClose();
    }.bind(this));

    setTimeout(() => {this.onOpen();}, 0);
  }

  send(data) {
    this.connection.sendUTF(JSON.stringify(data));
  }

  onOpen() {}
  onMessage(data) {}
  onError(error) {}
  onClose() {}
}

export default Connection;
