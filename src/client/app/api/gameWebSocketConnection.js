import {UPDATE_LOBBY, UPDATE_BOARD, UPDATE_PLAYERS} from '../actions/actionTypes';
import jsonWebsocket from './jsonWebsocket';

class gameWebSocketConnection extends jsonWebsocket {
	constructor(dispatch) {
		super('ws://127.0.0.1:1337');
		this.dispatch = dispatch;
	}
	
	onOpen() {}
	onError(error) {}
	onMessage(json) {
		dispatch(json);
	}
	onClose() {}
}

export default gameWebSocketConnection;