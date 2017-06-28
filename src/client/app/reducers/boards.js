import {UPDATE_BOARD, UPDATE_PLAYERS} from '../actions/actionTypes';
import initialState from './initialState';

const boards = (boards = initialState.boards, action) => {
  console.log("Boards: " + JSON.stringify(boards));
  if (!action || !action.type) {
    return boards;
  }
  switch (action.type) {
    case UPDATE_BOARD:
      return Object.assign({}, boards[action.gameIdentifier].board, action.boardInfo);
	case UPDATE_PLAYERS:
      return Object.assign({}, boards[action.gameIdentifier].players, action.playerInfo);
	default:
      return boards;
  }
};

export default boards;
