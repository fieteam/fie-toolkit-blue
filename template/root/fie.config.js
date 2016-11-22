
const spawn = require('cross-spawn');

module.exports = {
    // 当前项目使用的fie套件
  toolkit: 'fie-toolkit-blue',
  toolkitConfig: {
    // 本地服务器端口号
    port: 9000,
    // 是否自动打开浏览器
    open: true,
    // 打开浏览器后 自动打开的 目标页面
    openTarget: 'demos/index.html',
    // 文件修改后是否自动刷新浏览器
    liveload: true
  },
  tasks: {
    start: [
    ],
    build: [
    ],
    publish: [],
    open: []
  }
};
