'use strict';


var fs = require('fs');
var path = require('path');
var spawn = require('cross-spawn');

module.exports = function(fie, options) {

    var cli;

    var clientArgs = options.clientArgs;

    if (clientArgs && clientArgs.length) {
        process.env.SINGLE_PAGE = clientArgs[0];
    }

    if (!fs.existsSync(path.resolve(process.cwd(), 'webpack.config.js'))) {
        fie.logError('未发现 webpack.config.js 文件, 可以使用 fie add conf 添加对应版本 webpack 配置文件');
        return;
    }

    fie.logInfo('项目打包中...');
    cli = spawn('./node_modules/.bin/webpack', [
        '--config',
        './webpack.config.js'
    ], {stdio: 'inherit'});

    cli.on('close', function(status) {
        if (status == 0) {
            fie.logSuccess('打包完成');
            options.callback && options.callback();  
        } else {
            fie.logError('打包失败', status);
        }
    });
};
