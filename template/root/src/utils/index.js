
'use strict';

import { Promise } from 'es6-promise';
import { Dialog } from 'Blue';
import Apimap, { utils } from 'blue-lib-apimap';
import apiMapping from './apimap';

const ERR_DEFAULT = {
  ERR_DEFAULT_REQUEST_SUCCESS_FAIL: '接口调用成功，数据返回异常', // 接口请求成功 但是接口格式不符合
  ERR_DEFAULT_REQUEST_ERROR: '接口超时' // 请求超时 或者其他原因进入error的时候调用
};

const SUC_DEFAULT = {
  SUC_DEFAULT_REQUEST_SUCCESS: '接口调用成功' // 如果您想重置接口返回之后的默认上报信息 请重置该字段
};

const options = {
  tokenKey: '_tb_token_', // 默认的tokenKey 如果您想添加自己的tokenKey，请重写该字段
  needToken: false, // 如果您的接口调用不需要添加token 则设置该字段为false
  tokenMethod: 'get' // 最新token的获取方法 默认为get
};

// 初始化对象
const apiMap = new Apimap(
  apiMapping, // api映射
  ERR_DEFAULT,
  SUC_DEFAULT,
  options
);

function _ajax(params, suc = () => {}, err = () => {}) {
  function _suc(res) {
    suc && suc(res);
  }
  function _err(res, flag) {
    err && err(res, flag);
  }
  return new Promise((resolve, reject) => {
    const { notHandError = false } = params;
    apiMap.fetch(params, _suc, _err).then((res) => {
      // 直接返回结果
      resolve(res);
    }, (res) => {
      // 如果您需要在全局的请求中添加提示的话 可以放在这里
      // 我这里给出的例子，会默认使用blue的dialog组件弹出一个提示框
      (notHandError === false) && Dialog.alert({
        title: '提示',
        content: res.errMsg
      });
      // 如果是由于接口返回不符合格式 那么在回调中给出标示 在项目中做不同处理
      // const { __INTERFACE_SUCCESS__ } = res;
      // 你可以通过上述字段的标示区分接口超时以及接口返回数据不符合要求的情况
      reject(res);
    });
  });
}

// 为了兼容现有的仓库 做namespace透出
export const nameSpace = utils.namespace.bind(utils);

export const ajax = _ajax.bind(null);
export const Ajax = _ajax.bind(null);

export default utils;
