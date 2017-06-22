var guid = require('../guid');

var player = function player(board, x, y, r) {
	return {
		guid: guid(),
		board: board,
		position: {x: x, y: y, r: r},

		getIdentifier: function getIdentifier() {
			return this.guid;
		},
		
		getPosition: function getPosition() {
			return this.position;
		},
		
		updatePosition: function updatePosition(x, y, r) {
			this.position = {x: x, y: y, r: r};
		}
	}
}

module.exports = player;