
'use strict';

import Util from './index';


/**
 * 在url上加参数
 */
const obj2UrlString = function (obj) {
  let string = '';
  for (let key in obj) {
    if (obj[key] !== '') {
      string += key.trim() + '=' + obj[key] + '&';
    }
  }
  return string ? ('?' + string.slice(0, string.length - 1)) : '';
};
export function add(obj, url) {
  url = url || location.href;
  const hashArray = url.split('#');
  const paramArray = hashArray[0].split('?');
  let param = {};
  // 原有参数放入param对象
  if (paramArray[1]) {
    paramArray[1].split('&').forEach((item) => {
      const tempArr = item.split('=');
      // 参数值中有等号，做处理
      param[tempArr[0]] = tempArr.slice(1).join('=');
    });
  }
  // 将需要添加的参数放入param对象
  obj = obj || {};
  for (const key in obj) {
    param[key.trim()] = encodeURIComponent(obj[key]);
  }
  // 重组url
  url = paramArray[0] + obj2UrlString(param);
  return hashArray[1] ? (url += '#' + hashArray[1]) : url;
}


/**
 * 从URL上按参数名获取值
 */
export function getParameterByName(name) {
  const match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

/**
 *  神笔装修
 */
export function editUrl(url) {
  function getParam(name) {
    const reg = new RegExp('(^|&|\\?)' + name + '=([^&]*)(&|$)');
    const r = decodeURIComponent(url).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
  if (Util.isQn()) {
    const app = window.QN.application;
    app.invoke({
      cmd: 'shenbiPCDetail',
      param: {
        act: getParam('act') || 'ECRM_EDIT',
        actParam: getParam('actParam')
      }
    });
  } else {
    window.open(url);
  }
}


/**
 * cookie 操作
 */
export function setCookie(cName, value, expiredays) {
  {
    const exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = cName + '=' + escape(value) + ((expiredays === null) ? '' : ';expires=' + exdate.toGMTString());
  }
}

const needUnescape = function (s) {
  return /%u/.test(s.replace(/%5C/g, '%'));
};

export function getCookie(cName) {
  let value;

  if (document.cookie.length > 0) {
    let cStart = document.cookie.indexOf(cName + '=');
    if (cStart !== -1) {
      cStart = cStart + cName.length + 1;
      let cEnd = document.cookie.indexOf(';', cStart);
      if (cEnd === -1) {
        cEnd = document.cookie.length;
      }
      const s = document.cookie.substring(cStart, cEnd);
      if (needUnescape(s)) {
        value = unescape(s.replace(/%5C/g, '%'));
      } else {
        value = decodeURIComponent(s);
      }

      return value;
    }
  }
  return null;
}

/**
 * 环境
 */
const hostName = location.hostname;
let env;
if (hostName.indexOf('127.0.0.1') !== -1) {
  env = 'local';
} else if (hostName.indexOf('waptest') !== -1 || hostName.indexOf('daily') !== -1) {
  env = 'daily';
} else { // 其他情况都作为线上
  env = 'production';
}
export const ENV = env;
