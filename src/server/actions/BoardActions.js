import {UPDATE_LOBBY, JOIN_BOARD, UPDATE_BOARD, UPDATE_PLAYERS} from './ActionTypes';

export const updateLobby = (lobbyInfo) => {
  return {
    type: UPDATE_LOBBY,
	lobbyInfo
  };
};

export const joinGame = (gameIdentifier, boardInfo) => {
  return {
    type: JOIN_BOARD,
    gameIdentifier,
    boardInfo
  };
}

export const updateBoard = (gameIdentifier, boardInfo) => {
  return {
    type: UPDATE_BOARD,
	gameIdentifier,
	boardInfo
  };
};

export const updatePlayers = (gameIdentifier, playerInfo) => {
  return {
    type: UPDATE_PLAYERS,
	gameIdentifier,
	playerInfo
  };
};
