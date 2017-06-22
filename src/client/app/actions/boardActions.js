import {UPDATE_LOBBY, UPDATE_BOARD, UPDATE_PLAYERS} from './actionTypes';

export const updateLobby = (lobbyInfo) => {
  return {
    type: UPDATE_LOBBY,
	lobbyInfo
  };
};

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