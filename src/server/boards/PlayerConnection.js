import guid from '../guid';
import Connection from '../sockets/Connection'
import {joinGame, updateLobby} from '../actions/BoardActions'

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

	removeBoard(boardIdentifier) {
		return delete this.boards[boardIdentifier];
	}

	getBoards() {
		return Object.assign({}, this.boards);
	}

  onOpen() {
    this.guid = guid()
	this.boards = {};
    console.log("Connection Open <" + this.guid + ">");
	this.server.getLobby((lobbyInfo) => {
		this.updateLobby(lobbyInfo);
	});
  }

  onMessage(data) {
    console.log("Message <" + this.guid + "> " + JSON.stringify(data));
    switch (data.type) {
      case "CREATE_GAME":
          this.server.addBoard((boardIdentifier) => {
            this.server.addPlayerToBoard(boardIdentifier, this.getIdentifier(), (playerIdentifier) => {
							this.server.getBoard(boardIdentifier, this.getIdentifier(), (board) => {
								this.joinGame(boardIdentifier, board);
							});
          });
        });
        break;
      case "JOIN_GAME":
        this.server.addPlayerToBoard(data.gameIdentifier, this.getIdentifier(), () => {
            this.joinGame(boardIdentifier, board);
        });
        break;
    }
  }
  
  joinGame(boardIdentifier, boardInfo) {
	  this.send(joinGame(boardIdentifier, boardInfo));
  }
  
  updateLobby(lobbyInfo) {
	  this.send(updateLobby(lobbyInfo));
  }

  onError(error) {
    console.log("Message Error <" + this.guid + "> " + error);
  }

  onClose() {
    console.log("Connection Closed <" + this.guid + ">");
    this.server.removePlayer(this.getIdentifier());
  }
}

export default PlayerConnection;
