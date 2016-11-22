# fie-toolkit-blue

> **PC 端** React 工程开发套件，集成了 集成了 React + Redux + React-Router + Fusion的开发环境。

> 本套件对`fie-toolkit-next`进行了一些改造，使其更加符合聚星台业务线以及ISV同学

## 说明

> 注: 本套件生成的模板对 **IE8** 及以下的浏览器不兼容, 请确定业务的浏览器支持需求后使用


## 使用场景


### 无任何依赖的 react 项目

 - 项目初始化后，您可以删除 `pages/redux` `pages/router` `pages/home` 页面，只留下 `pages/help` 这个简单的页面。 
- blue 套件提供了 `fie add sp [name]` 命令，生成的页面便是没有任何依赖的，您可以自由添加自己的 UI 及逻辑。 


### 按制台单页面项目

- 如果您的项目想前后端分离得彻底点，后端只提供一个 vm 容器的话，那您可以使用 `pages/router` 类型的页面，里面建好了 `react` `redux` `react-router` 相关的使用模板
- 通过 `fie add rp [name]` 可以添加这样一个页面
- 通过 `fie add rrp [name]` 可以添加一个 `react-router` 对应的一个路由页面

### 控制台多页面项目

- 如果项目里面您觉得 react-router 太复杂 ， 不希望使用它，那您可以使用 删除掉 `pages/router` 这个页面
- 使用 `fie add lp [name]` 来添加带 `layout`的简单页面
- 使用 `fie add rd [name]` 来添加带 `redux` 及带 `layout`的页面


## 安装

```bash
$ fie install toolkit-blue
```

该套件依赖 [Node.js](http://nodejs.org/) 、 [npm](https://www.npmjs.com/) 、 [fie](https://www.npmjs.com/package/fie) 。请先确保本机已安装了fie的运行环境，若第一次使用，请[参考该文档进行环境搭建](https://www.npmjs.com/package/fie)。


## 参数配置

```js
//fie.config.js中的参数配置
{
    toolkit: 'fie-toolkit-blue',
    toolkitConfig: {
        port: 9000, //本地服务器端口号
        open: true,  //是否自动打开浏览器
        log: true,  //是否打印本地服务器访问日志
        openTarget: "demos/",   //打开浏览器后自动打开目标页面
        liveload: false //是否自动刷新
    }    
}
```

## 使用

### 初始化

```
$ fie init blue
```

### 开启本地服务器

```
$ fie start 
```

### 代码打包

```
$ fie build 
```

### 添加模块

```
$ fie add sp [name]                       # 添加简单页面
$ fie add lp [name]                       # 添加带 layout 的简单页面
$ fie add rd [name]                       # 添加带 layout 及 redux 的简单页面
$ fie add rp [name]                       # 添加带 layout 及 redux、router 的复杂页面
$ fie add rrp [topPageName]/[subPageName] # 添加带复杂页面的子页面
$ fie add data [name]                     # 添加本地数据接口  
$ fie add c [name]                        # 添加组件 
```


### 代码发布

```
$ fie publish d # 发布到日常
$ fie publish p # 发布到线上
```

## 项目说明

### 目录结构

```bash
.
├── README.md					# 当前项目的说明文件
├── build.js					# 打包文件，将node_modules及src中的文件编译到build目录
├── data							# 本地mock数据文件夹，mock数据均放该文件
│   ├── home.json
│   └── page2List.json
├── demos						# 页面入口文件夹，所有页面入口文件均放该文件夹
│   ├── help.html
│   ├── index.html
│   ├── redux.html
│   └── router.html
├── fie.config.js				# fie的配置文件，用于启动fie的相关命令
├── node_modules	
├── package.json
├── src							# 项目源码文件夹
│   ├── components			# 项目中公共的react组件文件夹
│   ├── pages					# 单个页面相关的文件夹
│   ├── styles					# 项目样式文件夹，存放所有样式相关的文件
│   └── utils					# 项目中医学共用的功能及函数集合
└── webpack.config.js		# webpack 的配置文件
```


## 问题反馈

0. 套件维护者：@宁尘
