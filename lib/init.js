/**
 */
'use strict';

var toolUtil = require('./util');
var _ = require('underscore');
var fs = require('fs');
var path = require('path');
var spawn = require('cross-spawn');
var inquirer = require('inquirer');
var chalk = require('chalk');
var logPrefix = require('./log.config.js').prefix;

module.exports = function(fie) {

var cwd = toolUtil.getCwd();
var projectName = cwd.split(path.sep).pop();
// 当前项目名称集合
var generateNames = toolUtil.generateNames(projectName);
var config = fie.getModuleConfig();

var validateFunc = function(answers) {
  return answers.needGit === 'y';
};

var serverName = '';
  inquirer.prompt([
    {
      type: 'input',
      name: 'appKey',
      message: '请输入您的appKey(12345678)，一般为8为数字，以千牛分配给您的为准:',
      validate: function(input) {
        if (input === '' || isNaN(+input)) {
          return '请输入合法的appKey';
        } else {
          return true;
        }
      }
    },
    {
      type: 'input',
      name: 'needGit',
      message: '是否初始化为git仓库(y/N)',
      default: 'y'
    },
    {
      type: 'input',
      name: 'server',
      message: '当前项目所属服务器',
      when: validateFunc,
      default: function() {
        return 'github.com';
      }
    },
    {
      type: 'input',
      name: 'group',
      message: '当前项目所在的group',
      when: validateFunc,
      validate: function(input) {
        if (!input) {
          return '您输入的group名称不合法';
        } else {
          return true;
        }
      }
    }
  ]).then(function(answers) {
    // 执行命令 后面 带上 --debug  才能看到的调试信息
    // 如 执行 fie init olympics --debug
    serverName = answers.server || serverName;
    fie.logDebug(
        _.extend({}, config, generateNames, {
          group: answers.group
        })
    );
    // copy root 目录到 项目中
    fie.dirCopy({
      src: toolUtil.getTemplateDir('root'),
      dist: cwd,
      data: _.extend({}, config, generateNames, {
        group: answers.group,
        // 兼容一下老版本
        projectName: projectName,
        logPrefix: logPrefix,
        appKey: answers.appKey
      }),
      ignore: [
        'node_modules',
        'build',
        '.DS_Store',
        '.idea'
      ],
      sstrRpelace: [
        {
          str: 'developing-project-name',
          replacer: projectName
        }
      ],
      filenameTransformer: function(name) {
        if (name === '_gitignore') {
          name = '.gitignore';
        }
        return name;
      }
    });
    
    if (answers.needGit === 'y') {
      // 判断是否有.git,没有的话 则初始化一下
      if (!fs.existsSync(path.join(cwd, '.git'))) {
        var remoteUrl = 'git@' + serverName + ':' + answers.group + '/' + generateNames.fileName + '.git';
        fie.logInfo('正在对接远程仓库 ... ');
        spawn.sync('git', ['init']);
        spawn.sync('git', ['remote', 'add', 'origin', remoteUrl]);
        // 初始化后提交一把
        spawn.sync('git', ['add', '*']);
        spawn.sync('git', ['commit', '-m', '初始化项目']);
        fie.logInfo(remoteUrl + ' 初始化成功...');
      }
    }
    // 安装依赖
    fie.logInfo('开始安装 dependencies 依赖包 ... ');

    fie.tnpmInstall({}, function(err) {
      if (err) {
        fie.logError('npm 依赖安装失败');
        fie.logError('请手动执行 npm install');
      } else {
        console.log(chalk.yellow('\n--------------------初始化成功,请按下面提示进行操作--------------------\n'));
        console.log(chalk.green( chalk.yellow('$ fie start') + '         # 可一键开启项目开发环境' ));
        console.log(chalk.green( chalk.yellow('$ fie help') + '          # 可查看当前套件的详细帮助' ));
        console.log(chalk.green( chalk.yellow('$ fie build') + '          # 可一键打包开发环境' ));
        console.log(chalk.green('\n建议将现有初始化的代码提交一次到master分支, 方便后续切换到开发分支进行开发...'));
        console.log(chalk.yellow('\n--------------------技术支持: @nx-theone--------------------\n'));
      }
    });
  });
};
