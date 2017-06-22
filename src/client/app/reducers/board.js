import {UPDATE_LOBBY, UPDATE_BOARD, UPDATE_PLAYERS} from '../actions/actionTypes';
import initialState from './initialState';

const board = (boards = initialState.boards, action) => {
  if (!action || !action.type) {
    return boards;
  }
  switch (action.type) {
    case UPDATE_BOARD:
		console.log(action);
      return Object.assign({}, boards[action.gameIdentifier].board, action.boardInfo);
	case UPDATE_PLAYERS:
      return Object.assign({}, boards[action.gameIdentifier].players, action.playerInfo);
    default:
      return boards;
  }
};

export default board;
