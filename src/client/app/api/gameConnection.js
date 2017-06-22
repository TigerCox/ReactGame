import {JOIN_GAME, LEAVE_GAME, PLAYER_ACTION} from '../actions/actionTypes';
import gameWebSocketConnection from './gameWebSocketConnection';

class gameConnection {
	constructor(dispatch) {
		this.connection = new gameWebSocketConnection(dispatch);
		if (!this.connection.hasWebSocket()) {
			this.connection = null;
		}
	}
	
	connect() {
		this.connection.connect();
	}
	
	command(json) {
		this.connection.send(json);
	}
	
	disconnect() {
		this.connection.close();
	}
	
	isConnected() {
		return this.connection.isReady();
	}
}

export default gameConnection;