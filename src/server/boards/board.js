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
		var state = new PlayerState(player, x, y, r);
		this.players[player.getIdentifier()] = state;
	}

	removePlayer(playerIdentifier) {
		delete this.players[playerIdentifier];
	}
}

export default Board;
