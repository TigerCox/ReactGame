import cache from 'memory-cache';
import ReadWriteLock from 'rwlock';
import SocketServer from '../sockets/SocketServer';
import PlayerConnection from './PlayerConnection';
import Board from './Board';

var lock = new ReadWriteLock();
var LOCK_NAME = "PlayerServer";
var BOARD_LOCK_NAME = LOCK_NAME + ".Boards";
var PLAYER_LOCK_NAME = LOCK_NAME + ".Players";

class SharedValueMap {
  constructor(rootLockName) {
	this.lock = new ReadWriteLock();
	this.rootLockName = rootLockName;
    this.values = {};
  }
  
  _addValue(value) {
	var oldValue = this.values[value.getIdentifier()];
    this.values[value.getIdentifier()] = value;
	return oldValue;
  }

  _getValue(identifier) {
    return this.values[identifier];
  }
  
  _getKeys() {
	return Object.keys(this.values).slice();
  }
  
  _getValues() {
	return Object.values(this.values).slice();
  }
  
  _removeValue(identifier) {
	 var value = this._getValue(identifier);
	 delete this.values[identifier];
	 return value;
  }
  
  _release(release) {
	  return () => {
		  if (release) {
			  release();
		  }
	  }
  }
  
  addValue(newValue, callback) {
    this.lock.writeLock(this.rootLockName, (parentRelease) => {
		this.lock.writeLock(this.rootLockName + newValue.getIdentifier(), (childRelease) => {
			var result = this._addValue(newValue);
			parentRelease();
			if (!callback) {
				childRelease();
			} else {
				callback(result, this._release(childRelease));
			}
		});
	});
  }
  
  getValue(identifier, callback) {
	  this.lock.readLock(this.rootLockName, (parentRelease) => {
		  var value = this._getValue(identifier);
		  if (!value) {
			  parentRelease();
			  callback(null, this._release(null));
		  } else {
			  this.lock.readLock(this.rootLockName + identifier, (childRelease) => {
				  parentRelease();
				  callback(value, this._release(childRelease));
			  });
		  }
	  });
  }
  
  getKeys(callback) {
	  this.lock.readLock(this.rootLockName, (parentRelease) => {
		  var value = this._getKeys();
		  callback(value, this._release(parentRelease));
	  });
  }
  
  getValues(callback) {
	  this.lock.writeLock(this.rootLockName, (parentRelease) => {
		  var value = this._getValues();
		  callback(value, this._release(parentRelease));
	  });
  }
  
  editValue(identifier, callback) {
	  this.lock.readLock(this.rootLockName, (parentRelease) => {
		  var value = this._getValue(identifier);
		  if (!value) {
			  parentRelease();
			  callback(null, this._release(null));
		  } else {
			  this.lock.writeLock(this.rootLockName + identifier, (childRelease) => {
				  parentRelease();
				  callback(value, this._release(childRelease));
			  });
		  }
	  });
  }
  
  removeValue(identifier, callback) {
	  this.lock.writeLock(this.rootLockName, (parentRelease) => {
		  this.lock.writeLock(this.rootLockName + identifier, (childRelease) => {
			  var value = this._removeValue(identifier);
			  parentRelease();
			  if (!callback) {
				  childRelease();
			  } else {
				  callback(value, this._release(childRelease));
			  }
		  });
	});
  }
}

class PlayerServer extends SocketServer {
  constructor() {
    super();
    this.players = new SharedValueMap(PLAYER_LOCK_NAME);
    this.boards = new SharedValueMap(BOARD_LOCK_NAME);
  }

  createConnection(request) {
    return this.addPlayer(request);
  }
  
  addPlayer(request) {
	var player = new PlayerConnection(this, request);
    this.players.addValue(player);
    return player;
  }

  addBoard(callback) {
    var newBoard = new Board();
	this.boards.addValue(newBoard, (oldBoard, boardRelease) => {
		boardRelease();
		if (callback) {
			callback(newBoard.getIdentifier());
		}
		this.updateLobby();
	});
	
	return newBoard;
  }

  addPlayerToBoard(boardIdentifier, playerIdentifier, callback) {
	this.boards.editValue(boardIdentifier, (board, boardRelease) => {
		  if (!board) {
			  boardRelease();
			  callback(false);
		  } else {
			this.players.editValue(playerIdentifier, (player, playerRelease) => {
				var result = false;
				if (player) {
					board.addPlayer(player);
					player.addBoard(board);
					result = true;
				}
				boardRelease();
				playerRelease();
				if (callback) {
					callback(result);
				}
				this.updateLobby();
			});
		  }
	});
  }

  removePlayerFromBoard(boardIdentifier, playerIdentifier, callback) {
	var boardResult = null;
	var playerResult = null;
	
	this.boards.editValue(boardIdentifier, (board, boardRelease) => {
		 boardResult = false;
		 if (board) {
			boardResult = board.removePlayer(playerIdentifier);
		 }
		 boardRelease();
		 if (playerResult !== null) {
			 if (callback) {
				callback(boardResult && playerResult);
			 }
			 this.updateLobby();
		 }
	});
	
	this.players.editValue(playerIdentifier, (player, playerRelease) => {
		 playerResult = false;
		 if (board) {
			playerResult = player.removeBoard(boardIdentifier);
		 }
		 playerRelease();
		 if (boardResult !== null) {
			 if (callback) {
				callback(boardResult && playerResult);
			 }
			 this.updateLobby();
		 }
	});
  }
  
  removePlayer(playerIdentifier, callback) {
	  this.players.removeValue(playerIdentifier, (player, playerRelease) => {
		  if (!player) {
			  playerRelease();
		  } else {
			  var boards = player.getBoards();
			  for (var boardIdentifier in boards) {
				this.boards.editValue(boardIdentifier, (board, boardRelease) => {
					if (board != null) {
						board.removePlayer(player);
					}
					boardRelease();
				});
			  }
			  playerRelease();
		  }
	  });
  }
  
  removeBoard(boardIdentifier, callback) {
	  this.boards.removeValue(boardIdentifier, (board, boardRelease) => {
		  if (!board) {
			  boardRelease();
		  } else {
			  var players = board.getPlayers();
			  for (var playerIdentifier in players) {
				this.players.editValue(playerIdentifier, (player, playerRelease) => {
					if (player != null) {
						player.removeBoard(board);
					}
					playerRelease();
				});
			  }
			  boardRelease();
		  }
	  });
  }

  getBoard(boardIdentifier, playerIdentifier, callback) {
	  this.boards.getValue(boardIdentifier, (board, boardRelease) => {
		  var result = null
		  if (!board) {
			  result = board.getBoard();
		  }
		  boardRelease();
		  callback(result);
	  });
  }
  
  getLobby(callback) {
	  this.boards.getValues((boards, boardRelease) => {
		 var result = [];
		 for(var i = 0; i < boards.length; i++) {
			var board = boards[i];
			result.push({identifier: board.getIdentifier(), players: 0});
		 }
		 boardRelease();
		 callback(result);
	  });
  }
  
  updateLobby(callback) {
	  this.getLobby((lobbyInfo) => {
		this.players.getKeys((playerKeys, parentRelease) => {
			for (var i = 0; i < playerKeys.length; i++) {
				this.players.editValue(playerKeys[i], (player, playerRelease) => {
					player.updateLobby(lobbyInfo);
					playerRelease();
				});
			}
			parentRelease();
		});
	  });
  }
}

export default PlayerServer;
