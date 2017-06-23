import guid from '../guid';
import Connection from '../sockets/Connection'
import {joinGame} from '../actions/BoardActions'

class PlayerConnection extends Connection {
	constructor(server, request) {
		super(request);
    this.server = server;
	}

	getIdentifier() {
		return this.guid;
	}

	addBoard(board) {
		this.boards[board.getIdentifier()] = board;
	}

	removeBoard(board) {
		delete this.boards[board.getIdentifier()];
	}

	getBoards() {
		return Object.assign({}, this.boards);
	}

  onOpen() {
    this.guid = guid()
		this.boards = {};
    console.log("Connection Open <" + this.guid + ">");
  }

  onMessage(data) {
    console.log("Message <" + this.guid + "> " + JSON.stringify(data));
    switch (data.type) {
      case "CREATE_GAME":
          this.server.addBoard(function(boardIdentifier) {
            this.server.addPlayerToBoard(boardIdentifier, this.getIdentifier(), function(playerIdentifier) {
							this.server.getBoard(boardIdentifier, this.getIdentifier(), function(board) {
								this.send(joinGame(boardIdentifier, board));
							}.bind(this));
          }.bind(this));
        }.bind(this));
        break;
      case "JOIN_GAME":
        this.server.addPlayerToBoard(data.gameIdentifier, this.getIdentifier(), function() {
            this.send(joinGame(boardIdentifier, board));
        }.bind(this));
        break;
    }
  }

  onError(error) {
    console.log("Message Error <" + this.guid + "> " + error);
  }

  onClose() {
    console.log("Connection Closed <" + this.guid + ">");
    for (var boardIdentifier in this.boards) {
      this.server.removePlayerFromBoard(boardIdentifier, this.getIdentifier(), function() {});
    }
    this.boards = {};
  }
}

export default PlayerConnection;
