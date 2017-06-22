import React from 'react';
import {render} from 'react-dom';
import gameConnection from './api/gameConnection';
import configureStore from './store/configureStore';
import {connect, joinGame} from './actions/playerActions';

const store = configureStore();

class App extends React.Component {
  render () {
    return <p> Hello React!!</p>;
  }
}

render(<App/>, document.getElementById('app'));
store.dispatch(connect());
store.dispatch(joinGame(10));
