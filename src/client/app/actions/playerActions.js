import {JOIN_GAME, LEAVE_GAME, PLAYER_ACTION} from './actionTypes';
import gameConnection from '../api/gameConnection';

var connection = null;

export const joinGame = (gameIdentifier) => {
  return () => {
    connection.command({
		type: JOIN_GAME,
		gameIdentifier
	});
  };
};

export const leaveGame = (gameIdentifier) => {
  return () => {
	connection.command({
		type: LEAVE_GAME,
		gameIdentifier
	});
  };
};

export const performAction = (gameIdentifier, action) => {
  return () => {
	connection.command({
		type: PLAYER_ACTION,
		gameIdentifier,
		action
	});
  };
};

export const connect = () => {
  return (dispatch) => {
	connection = new gameConnection(dispatch);
	connection.connect();
  }
}

export const disconnect = () => {
  return () => {
	connection.disconnect();
	connection = null;
  }
};