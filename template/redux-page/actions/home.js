
'use strict';

// constants 与 actions 在一起
import { ajax, nameSpace } from 'utils/index';

const ns = nameSpace('HOME');
export const GET_DATA = ns('GET_DATA');

export function getData(params) {
  return (dispatch) => {
    ajax(params).then(() => {
      dispatch({
        type: GET_DATA,
        data: 'home'
      });
    }, () => {

    });
  };
}
