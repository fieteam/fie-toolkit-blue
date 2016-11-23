/**
 * @author nx-theone
 */
'use strict';

var path = require('path');
var fs = require('fs');
var spawn = require('cross-spawn');
var toolUtil = require('./util');
var cwd = toolUtil.getCwd();

/**
 * 获取当前分支
 * @returns {string}
 */
function getCurBranch() {
  var headerFile = path.join(cwd, '.git/HEAD');
  var gitVersion = fs.existsSync(headerFile) && fs.readFileSync(headerFile, {encoding: 'utf8'}) || '';
  var arr = gitVersion.split(/refs[\\\/]heads[\\\/]/g);
  var v = arr && arr[1] || '';
  return v.trim();
}

module.exports = function(fie, options) {
  var clientArgs = options.clientArgs;
  var type = clientArgs.shift() || 'd';
  var branch = getCurBranch();
  if (branch === 'master') {
    fie.logWarn('不建议在master分支上进行开发及发布,建议切换到 daily/x.y.z 分支进行开发');
  }
  // 发布到daily环境
  if (type === 'd' || type === 'daily') {
    fie.logInfo('开始提交到daily环境,大概需要几秒的时间,请稍等...');
    fie.getFieModule('fie-plugin-git', function(err, git) {
      git(fie, {
        clientArgs: ['publishDaily'],
        callback: function() {
          fie.logSuccess('发布成功,所有操作完成!');
          options.callback && options.callback();  
        }
      });
    });
    return;
  }
  fie.logInfo('开始进行项目发布,大概需要几十秒的时间,请稍等...');
  fie.getFieModule('fie-plugin-git', function(err, git) {
    git(fie, {
      clientArgs: ['sync'],
      callback: function() {
        // 发布前同步一下版本号
        git(fie, {
          clientArgs: ['publishCDN'],
          callback: function() {
            fie.logSuccess('发布成功,所有操作完成!');
            options.callback && options.callback();  
          }
        });
      }
    });
  });
};
