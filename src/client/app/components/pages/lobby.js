import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { createGame, joinGame } from '../../actions/playerActions';

class Game extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
	  <button onClick={()=>{this.props.onClick(this.props.identifier);}}>Join Game [Player: {this.props.playerCount}]</button>
    );
  }
}

const GameList = [ {identifier: "Game 1", Players: 2}, {identifier: "Game 2", Players: 0}, {identifier: "Game 3", Players: 2} ];

class LobbyObject extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
	    <button onClick={()=>{this.props['CreateGame']();}}>Create Game</button>
		{GameList.map((game) => <Game onClick={this.props['JoinGame']} identifier={game.identifier} playerCount={game.Players} />)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ['lobby']: state.lobby,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
	['CreateGame']: () => { dispatch(createGame()); },
    ['JoinGame']: (gameIdentifier) => { dispatch(joinGame(gameIdentifier)); }
  };
};

const Lobby = connect(mapStateToProps, mapDispatchToProps)(LobbyObject);

export default Lobby;
