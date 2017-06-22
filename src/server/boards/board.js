var guid = require('../guid');
var Player = require('./player');

var board = function board() {
	return {
		guid: guid(),
		turn: null,
		players: {},
		board: [[0b1001,0b1000,0b1100],[0b0001,0b0000,0b0100],[0b0011,0b0010,0b0110]],
		
		getIdentifier: function getIdentifier() {
			return this.guid;
		},
		
		addPlayer: function addPlayer() {
			var startPosition = this._getStartingPoint();
			var newPlayer = Player(this, startPosition.x, startPosition.y, Math.floor(Math.random() * 4));
			this.players[newPlayer.getIdentifier()] = newPlayer;
			return newPlayer.getIdentifier();
		},
		
		killPlayer: function killPlayer(identifier) {
			delete this.players[identifier];
		},
		
		_getStartingPoint: function _getStartingPoint() {
			var startPositions = this._validStartPoints();
			return startPositions[Math.floor(Math.random() * startPositions.length)];
		},
		
		_validStartPoints: function _validStartPoints() {
			var validPoints = [];
			for (var x = 0; x < this.board.length; x++) {
				for (var y = 0; y < this.board[x].length; y++) {
					if (!this._getPlayer(x,y)) {
						validPoints.push({x, y});
					}
				}
			}
			return validPoints;
		},
		
		_getPlayer: function _getPlayer(x, y) {
			for (var id in this.players) {
				var position = this.players[id].getPosition();
				if (position.x === x && position.y === y) {
					return this.players[id];
				}
			}
			return null;
		},
		
		getBoard: function getBoard() {
			return this.board;
		}
	}
}

module.exports = board;