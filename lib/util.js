'use strict';

var path = require('path');
var templateDir = path.resolve(__dirname, '../template/');
var cwd = process.cwd();

function firstUpperCase(str) {
  return str.replace(/^\S/, function(s) {
    return s.toUpperCase();
  });
}

function camelTrans(str, isBig) {
  var i = isBig ? 0 : 1;
  str = str.split('-');
  for (; i < str.length; i++) {
    str[i] = firstUpperCase(str[i]);
  }
  return str.join('');
}

module.exports = {
  /**
   * 用户输入的是用横杠连接的名字
   * 根据用户输入的name生成各类规格变量名: 横杠连接,小驼峰,大驼峰,全大写
  */
  generateNames: function(name) {
    return {
      // 横杠连接
      fileName: name,
      // 小驼峰
      varName: camelTrans(name),
      // 大驼峰
      className: camelTrans(name, true),
      // 全大写
      constName: name.split('-').join('').toUpperCase()
    };
  },
  getTemplateDir: function(type) {
    return type ? path.resolve(templateDir, type) : templateDir;
  },
  getCwd: function() {
    return cwd;
  }
};
