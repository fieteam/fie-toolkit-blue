
'use strict';

import { ajax, nameSpace } from 'utils/index';

const ns = nameSpace('<{%= className %}>');
export const GET_DATA = ns('GET_DATA');

export function getData(data) {
  return (dispatch) => {
    ajax({
      api: '',
      method: 'get'
    }).then(() => {
      dispatch({
        type: GET_DATA,
        data
      });
    }, () => {

    });
  };
}
