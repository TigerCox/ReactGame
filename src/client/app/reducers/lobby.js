import {UPDATE_LOBBY} from '../actions/actionTypes';
import initialState from './initialState';

const lobby = (lobby = initialState.lobby, action) => {
  console.log("Lobby: " + JSON.stringify(lobby));
  if (!action || !action.type) {
    return lobby;
  }
  switch (action.type) {
    case UPDATE_LOBBY:
	  return action.lobbyInfo.slice();
    default:
      return lobby;
  }
};

export default lobby;
