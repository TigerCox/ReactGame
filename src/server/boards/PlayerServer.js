import cache from 'memory-cache';
import ReadWriteLock from 'rwlock';
import SocketServer from '../sockets/SocketServer';
import PlayerConnection from './PlayerConnection';
import Board from './Board';

var lock = new ReadWriteLock();
var LOCK_NAME = "PlayerServer";

class PlayerServer extends SocketServer {
  constructor() {
    super();
    this.players = new cache.Cache();
    this.boards = new cache.Cache();
  }

  createConnection(request) {
    var player = new PlayerConnection(this, request);
    this._addPlayer(player);
    return player;
  }

  _addBoard(board) {
    this.boards.put(board.getIdentifier(), board);
  }

  _getBoard(boardIdentifier) {
    return this.boards.get(boardIdentifier);
  }

  _addPlayer(player) {
    this.players.put(player.getIdentifier(), player);
  }

  _getPlayer(playerIdentifier) {
    return this.players.get(playerIdentifier);
  }

  addBoard(callback) {
    var newBoard = new Board();
    this._addBoard(newBoard);
    callback(newBoard.getIdentifier());
  }

  addPlayerToBoard(boardIdentifier, playerIdentifier, callback) {
    lock.writeLock(LOCK_NAME + boardIdentifier, function(release) {
      var board = this._getBoard(boardIdentifier);
      var player = this._getPlayer(playerIdentifier);
      if (board != null && player != null) {
        board.addPlayer(player);
        release();
        callback(boardIdentifier);
      } else {
        release();
        callback(null);
      }
    }.bind(this));
  }

  removePlayerFromBoard(boardIdentifier, playerIdentifier, callback) {
    lock.writeLock(LOCK_NAME + boardIdentifier, function(release) {
      var board = this._getBoard(boardIdentifier);
      var player = this._getPlayer(playerIdentifier);
      if (board != null && player != null) {
        board.removePlayer(playerIdentifier);
        release();
        callback(boardIdentifier);
      } else {
        release();
        callback(null);
      }
    }.bind(this));
  }

  getBoard(boardIdentifier, playerIdentifier, callback) {
    lock.readLock(LOCK_NAME + boardIdentifier, function(release) {
      var board = this._getBoard(boardIdentifier);
      var player = this._getPlayer(playerIdentifier);
      if (board != null && player != null) {
        var result = board.getBoard().slice();
        release();
        callback(result);
      } else {
        release();
        callback(null);
      }
    }.bind(this));
  }
}

export default PlayerServer;
