import React from 'react';
import {Route} from 'react-router';

import MainLayout from './components/layouts/MainLayout';
import Lobby from './components/pages/Lobby';

export default (
  <Route component={MainLayout}>
    <Route path='/' component={Lobby} />
    <Route path='*' component={Lobby} />
  </Route>
);
