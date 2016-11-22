
'use strict';

import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import page1 from './page1/';
import page2 from './page2/';
import home from './home/';

// 将现有的reduces加上路由的reducer
const rootReducer = combineReducers({
  home,
  page1,
  page2,
  routing: routerReducer
});

export default rootReducer;
