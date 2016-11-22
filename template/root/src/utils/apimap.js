
'use strict';

const apiMap = window.INIT_DATA;

const api = {
  /* invoke */
  banner: ['', 'get']
};

if (apiMap) {
  for (let key in api) {
    let item = api[key] || [];
    item[0] = apiMap[key] || item[0];
    api[key] = item;
  }
}

export default api;
