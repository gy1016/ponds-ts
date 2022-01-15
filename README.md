<div align="center">

# Task Ponds | TypeScript

<!-- markdownlint-disable-next-line MD036 -->
_✨ Author: gy1016 | Saltro | Jiyueyue ✨_
</div>

<p align="center">
  <a href="https://github.com/gy1016/ponds-ts">
    <img src="https://img.shields.io/badge/Github-TaskPonds-brightgreen?logo=github" alt="frontend_repository">
  </a>
  <a href="https://github.com/gy1016/ponds-serve">
    <img src="https://img.shields.io/badge/Github-TaskPonds_backend-brightgreen?logo=github" alt="backend_repository">
  </a>
  <br />
  <img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/gy1016/ponds-ts">
  <a href="stargazers">
    <img src="https://img.shields.io/github/stars/gy1016/ponds-ts?color=yellow&label=Github%20Stars" alt="star">
  </a>
</p>
<!-- markdownlint-enable MD033 -->

**注意：本项目未添加任何开源协议，即作者保留一切版权和其权利。开源该代码仅用于学习参考，在未征得作者同意之前不得进行修改、分发、商用、非商用。**

## 项目介绍

TaskPonds -「Task Pool 是一个任务计划状态管理工具，由「💡 计划池」、「📌 就绪池」、「🧭 执行池」、「📆 验收池」、「⏳ 阻塞池」、「🎉 完成池」、「📝 酱油池」七个任务池组成，用户可为不同任务池添加任务，也可拖动某一任务放到另一个池子。它也提供了任务的可视化分析看板，通过对任务执行情况的追踪，用户可以看到本月的项目参与情况。并且根据任务的紧急性、重要性生成的四象限图更能够帮助用户进行任务的筛选与切分。

### 任务池划分

- 计划池 - 可以把「任务计划池」看做一个收藏夹/备忘录，不计大小/优先级/粒度划分，里面记录自己任何的想法和未来可能要做的事。

- 就绪池 - 从「计划池」里筛选出来等待执行的确定任务，或切分高优先级、较容易实现、能快速产生短期正反馈的任务，放到「任务就绪池」。

- 执行池 - 拖到这个池子里面的任务都是正在执行的任务点。一天之内要执行的任务点建议安排在3~5个，拖太多过来可能会做不完哦~

- 验收池 - 做完的任务可以当即拖到此处。有时任务本身虽然完成了，但后续的一些复盘、总结、对比、输出等记录工作需要缓冲和沉淀。

- 酱油池 - 可以利用玩手机的时间来做些有意义的事情呐~

- 阻塞池 - 当前阻挠我的任务，可以来源于「任务计划池」，「任务执行池」等，这个里面的任务可以暂缓执行哦~总会突破的！

- 完成池 - 搞完的任务统统给我丢进来！任务的宿命就在我这里！

### 系统功能展示

#### 登陆注册

系统使用了JWT进行登陆管理与权限校验，刷新页面自动读取本地Token进行用户登录。

![登陆界面](https://s4.ax1x.com/2022/01/15/7YMnUg.png)


#### 任务面板

任务面板借助react-beautiful-dnd实现了任务在不同池子中的拖拽，并通过react-query实现了在拖拽过程中的乐观更新。可以新加任务，并对任务进行编辑删除操作，在此过程当中还会记录任务的操作流程，为分析面板提供数据支撑。

![任务面板](https://s4.ax1x.com/2022/01/15/7YFNL9.gif)

#### 分析面板

提供任务搜索，并对任务进行溯源分析；统计系统使用天数，计算任务完成度，鼓励我们形成正反馈。提供日历图展示每日操作次数；提供任务分布现象图，将任务按照时间与重要程度两个属性绘制在二维坐标面中，方便我们一眼就可以看出任务间孰轻孰重！

![分析面板](https://s4.ax1x.com/2022/01/15/7YkLcD.png)

![任务溯源](https://s4.ax1x.com/2022/01/15/7YkhnJ.png)

## 技术体系

### UI设计

UI 由团队成员 `Jiyueyue` 使用 Figma 软件，结合作品主题，选用蓝白作为主色调，并开始 UI 设计。

![UI设计图](https://s4.ax1x.com/2022/01/15/7YMosP.png)

### 前端

- 部署地址：[121.199.160.202/taskpools/](http://121.199.160.202/taskpools/)
- 仓库地址：[gy1016/ponds-ts](https://github.com/gy1016/ponds-ts)

前端由团队共同开发，主要使用 `React` 框架并结合 `TypeScript` 进行开发，自行利用 `Webpack` 搭建项目，并进行了项目代码(Prettier+Eslint)、样式(stylelint)与提交(commitlint)格式规范的配置。

![前端仓库](https://s4.ax1x.com/2022/01/15/7YEKZd.png)

### 后端

- API 地址：[121.199.160.202:5000/api/pond](http://121.199.160.202:5000/api/pond)
- 项目地址：[gy1016/ponds-serve](https://github.com/gy1016/ponds-serve)

后端使用 `Koa` 采用 `MVC` 架构，运用 `MySQL` + `Sequelize` 进行后端的接口，使用 `jwt` `koa-bodyparser` `koa2-cors` 等中间件实现授权，返回结果JSON化与跨域。

![后端仓库](https://s4.ax1x.com/2022/01/15/7YV0ne.png)

### 部署

本项目采用前后端分离部署：

- 前端使用 `Github Actions` 与 `Nginx` 实现了 CI/CD  

- 后端使用 `PM2` 实现接口服务的提供与监控 

## 项目构建与部署

### 本地运行

- 依赖安装

  ```bash
  $ yarn install
  ```

- 项目启动
  
  ```bash
  $ npm run dev
  ```

- 项目构建

    ```bash
    $ npm run build
    ```

## 项目目录结构

### 前端目录

```
├── commitlint.config.js
├── dist
├── package.json
├── public
├── README.md
├── src
|  ├── api
|  ├── App.less
|  ├── App.tsx
|  ├── assets
|  ├── components
|  ├── context
|  ├── enums
|  ├── hooks
|  ├── index.tsx
|  ├── layouts
|  ├── settings
|  ├── styles
|  ├── types
|  ├── utils
|  └── views
├── tsconfig.json
├── webpack.config.js
└── yarn.lock
```


### 后端目录

```
├── app.js
├── bin
├── config.js
├── controllers
├── db
|  ├── model
|  ├── seq.js
|  ├── sync.js
|  └── types.js
├── middlewares
|  ├── cors.js
|  └── jwt.js
├── models
|  └── Result.js
└── package.json
```