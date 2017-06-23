import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import routes from './routes';
import {Router, Route, browserHistory} from 'react-router';
import configureStore from './store/configureStore';
import {connect} from './actions/playerActions';

import MainLayout from './components/layouts/MainLayout';
import Lobby from './components/pages/Lobby';

const store = configureStore();
store.dispatch(connect());

render(
  <Provider store={store}>
    <Router history={browserHistory} route={routes}>
      <Route component={MainLayout}>
        <Route path='/' component={Lobby} />
        <Route path='*' component={Lobby} />
      </Route>
    </Router>
  </Provider>, document.getElementById('app')
);
