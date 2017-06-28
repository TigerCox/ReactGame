import guid from '../guid';

class PlayerState {
	constructor(player, x, y, r) {
		this.player = player;
		this.x = x;
		this.y = y;
		this.r = r;
	}
}

class Board {
	constructor() {
		this.guid = guid();
		this.turn = null;
		this.players = {};
		this.board = [[0b1001,0b1000,0b1100],[0b0001,0b0000,0b0100],[0b0011,0b0010,0b0110]];
	}

	getIdentifier() {
		return this.guid;
	}

	addPlayer(player) {
		var state = new PlayerState(player, 0, 0, 0);
		this.players[player.getIdentifier()] = state;
	}

	removePlayer(playerIdentifier) {
		return delete this.players[playerIdentifier];
	}
	
	getPlayers() {
		return Object.assign({}, this.players);
	}
	
	getBoard() {
		var result = [];
		for (var i = 0; i < this.board.length; i++) {
			result.push(this.board[i].slice());
		}
		return result;
	}
}

export default Board;
