var cache = require('memory-cache');
var ReadWriteLock = require('rwlock');
var Board = require('./board');

var lock = new ReadWriteLock();
var LOCK_NAME = "gameBoard";

var boards = function boards() {
	return {
		boards: {},
		
		addBoard: function addBoard(callback) {
			var newBoard = Board();
			this.boards[newBoard.getIdentifier()] = newBoard;
			console.log("Board" + newBoard.getIdentifier());
			callback(newBoard.getIdentifier());
		},
		
		addPlayer: function addPlayer(boardIdentifier, callback) {		
			lock.writeLock(LOCK_NAME + boardIdentifier, function(release) {
				var playerIdentifier = this.boards[boardIdentifier].addPlayer();
				console.log("Board" + playerIdentifier);
				release();
				callback(playerIdentifier);
			}.bind(this));
		},
		
		getBoard: function getBoard(boardIdentifier, playerIdentifier, callback) {
			lock.readLock(LOCK_NAME + boardIdentifier, function(release) {
				var board = this.boards[boardIdentifier].getBoard();
				console.log("Board" + board);
				release();
				callback(board);
			}.bind(this));
		},
		
		getPlayers: function getPlayers(boardIdentifier, playerIdentifier, callback) {
			
		}
	}
}

module.exports = boards;