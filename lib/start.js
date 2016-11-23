/**
 * 打开服务器
 */
'use strict';
var fs = require('fs');
var path = require('path');
var spawn = require('cross-spawn');
var open = require('open');

/**
 *
 * @param fie
 * @param fie.getModuleConfig
 * @param fie.logError
 */
module.exports = function(fie, options) {

  var clientArgs = options.clientArgs;
  if (clientArgs && clientArgs.length) {
    process.env.SINGLE_PAGE = clientArgs[0];
  }
  var toolkitConfig = fie.getModuleConfig();
  if (!fs.existsSync(path.resolve(process.cwd(), 'webpack.config.js'))) {
    fie.logError(
        '未发现 webpack.config.js 文件, 可以使用 fie add conf 添加对应版本 webpack 配置文件'
    );
    return;
  }
  process.env.DEV = 1;
  process.env.LIVELOAD = toolkitConfig.liveload ? 1 : 0;
  // 80端口需要sudo开启
  if (toolkitConfig.port == 80) {
    spawn('sudo', [
      './node_modules/.bin/webpack-dev-server',
      '--config',
      './webpack.config.js',
      '--host',
      '0.0.0.0',
      '--port',
      toolkitConfig.port
    ], {stdio: 'inherit'});
  } else {
    spawn('./node_modules/.bin/webpack-dev-server', [
      '--config',
      './webpack.config.js',
      '--host',
      '0.0.0.0',
      '--port',
      toolkitConfig.port
    ], {stdio: 'inherit'});
  }
  if (toolkitConfig.open) {
    // 开服务器比较慢,给它留点时间buffer
    setTimeout(function() {
      open('http://127.0.0.1:' + toolkitConfig.port + '/' + toolkitConfig.openTarget);
    }, 2000);
  }
  options.callback && options.callback();  
};
