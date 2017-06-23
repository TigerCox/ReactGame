import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { createGame, joinGame } from '../../actions/playerActions';

class LobbyObject extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
	     <button onClick={()=>{this.props['CreateGame']();}}>Create Game</button>
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
