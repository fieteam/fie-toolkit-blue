'use strict';

import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Home from './containers/home/index';
import Page1 from './containers/page1/index';
import Page2 from './containers/page2/index';

let pageTitle = document.title;

const onRouteEnter = (nextState, replace, callback) => {
  callback();
};
const onRouteChange = (prevState, nextState, replace, callback) => {
  callback();
  document.title = nextState.routes[1].title || pageTitle;
};
export default (
  <Route path="/" onEnter={onRouteEnter} onChange={onRouteChange}>
    <Route path="index" component={Home} title="index" />
    <Route path="page1" component={Page1} title="page1"/>
    <Route path="page2" component={Page2} title="page2"/>
    <IndexRoute component={Home}/>
    <Route path="*" component={Home}/>
  </Route>
);
