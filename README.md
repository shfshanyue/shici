# 诗词弦歌

出于个人兴趣做的一个网站作为自己技术上的试验田

+ [shfshanyue/apollo-server-starter](https://github.com/shfshanyue/apollo-server-starter): 相配套的后端所抽离出来了脚手架 
+ [shfshanyue/shici-server](https://github.com/shfshanyue/shici-server): 相配套的后端，即将使用我新做的[脚手架](https://github.com/shfshanyue/apollo-server-starter)重写

<p align="center">
  <a href="https://shici.xiange.tech">
    <img src="https://raw.githubusercontent.com/shfshanyue/shici/master/static/screen.jpg" width="600" alt="诗词" /><br>
    <sup>https://shici.xiange.tech</sup>
  </a>
</p>
<p align="center">
  <a href="https://graphql.xiange.tech/playground">
    <img src="https://raw.githubusercontent.com/shfshanyue/shici/master/static/playground.png" width="600" alt="诗词" /><br>
    <sup>https://graphql.xiange.tech</sup>
  </a>
</p>

> 考虑使用 Prerender 的方式重写项目

## 技术栈

+ [typescript](https://github.com/microsoft/TypeScript)，[graphql-code-generator](https://github.com/dotansimha/graphql-code-generator) -- 强类型语言以及类型自动生成
+ [react](https://github.com/facebook/react), [next.js](https://github.com/zeit/next.js), [next-routes](https://github.com/fridays/next-routes) -- 服务端渲染
+ [graphql](https://github.com/graphql/graphql-js), [apollo-client](https://github.com/apollographql/apollo-client), `localstorage` -- API && store
+ `docker`, `docker-compose`, `traefik`, `gitlab-ci` -- 部署

## 相关问题与思考

+ CI 与前端质量保障
+ 当使用 graphql 时，前后端的协作与交流
+ 服务器渲染与 prerender 之优劣
+ 关于服务器渲染的实践及若干考虑
+ 如何对一个进程进行内存以及CPU的监控
+ [关于统计诗词字云的解决方案](https://shanyue.tech/post/poem-char-frequent-stat)
+ [关于 async/await 的两个 OOM 的问题](https://shanyue.tech/post/async-oom)
+ dataloader 源码解析
+ graphql.js 源码解析
+ 浅谈 graphql 中 server/http/client 中的缓存策略
+ [graphql-tag 的使用以及源码解析](https://shanyue.tech/code/graphql-tag/)
+ [graphql 服务端开发指南](https://shanyue.tech/post/graphql-guide/)
+ 使用 lru-cache 来避免 graphql 中的缓存崩溃问题
+ 日志，filebeat 与 elk
+ 关于日志的收集以及优化
+ [使用 requestId 标记全链路日志](https://shanyue.tech/post/requestId-and-tracing)
+ [node 中异常收集与监控](https://shanyue.tech/post/server-structed-error)
+ [graphql 中 apollo-server 对 cache 的处理](https://shanyue.tech/record/2019.html#_2019-07-31)
+ [使用 graphql 的 schema 自动生成 typescript 的type](https://shanyue.tech/record/2019.html#_2019-08-01)
+ [关于诗词的 GraphQL API](https://shanyue.tech/post/shici-api/)
+ [在 pg 中重设用户表的 ID](https://shanyue.tech/post/refactor-id-in-pg)
+ [如何实现类似 lodash 的 get 与 merge 函数](https://shanyue.tech/post/lodash-get-and-merge/)
+ [使用 jwt 实践邮件验证与登录](https://shanyue.tech/post/jwt-and-verifyCode)
+ [jwt 指南](https://shanyue.tech/post/JWT-Guide)
+ [使用十行 React 代码实现一个关键字高亮组件](https://shanyue.tech/post/highlight-in-react)
+ [使用 enum 代替 constant number](https://shanyue.tech/post/constant-db-to-client/)
+ [使用纯 CSS 实现仿 Material Design 的 input 过渡效果](https://shanyue.tech/post/login-input-style/)
+ [使用 docker 高效部署前端](https://shanyue.tech/post/deploy-frontend-with-docker)
+ [traefik 入手以及简单配置](https://shanyue.tech/post/traefik-start)
+ [当我有一台服务器时，我做了什么](https://shanyue.tech/post/server-todo/)

## 目录结构

``` shell
$ tree -L 2 -I node_modules --dirsfirst -aF
.
├── .next/                        # 打包后文件
├── components/                   # 基本组件
├── config/
│   └── index.js                  # 配置文件
├── lib/                          # 工具包
│   ├── init-apollo.js            # apollo config
│   ├── utils.js                  # 工具函数
│   └── with-apollo-client.js
├── pages/                        # 页面组件
│   ├── profile/                  # 个人信息
│   ├── _app.js                   # 页面入口
│   ├── _error.js                 # 错误页
│   └── index.js                  # 首页
├── .babelrc
├── .gitignore
├── .gitlab-ci.yml                # CI 配置
├── static                        # 静态文件
├── Dockerfile
├── README.md
├── docker-compose.yml
├── next.config.js                # next 配置，包括 webpack
├── package-lock.json
├── package.json
├── query.gql                     # GraphQL Query/Mutation
├── routes.js                     # 路由
├── server.js                     # 应用程序入口
└── theme.json
```

## 运行

``` shell
$ npm install

# 开发
$ npm run dev

# 运行
$ npm start

# 部署/需要配置 CI
$ git push origin master

# 分析包大小
$ npm run stat
```

## TODO

+ [x] CI 自动部署
+ [x] 自写工具函数替代 `lodash`，减小打包体积
+ [x] 自写组件替代 `antd`，减小打包体积
+ [x] robots/sitemap
+ [x] 点击喜欢与会背时的 `Optimistic UI`
+ [x] typescript 支持
+ [ ] 添加经史子集
+ [ ] 在诗词的赏析中为其所引用到的古籍添加链接
+ [ ] eslint 支持
+ [ ] Sentry 支持
+ [ ] 图片优化
+ [ ] 添加错误提示组件
+ [ ] 更好的 dockerfile，更快的构建速度
+ [ ] 更好的 CI pipeline
+ [ ] 当出现 404 页面时，返回真正的 404 状态码，优化 SEO
+ [ ] 状态优化: 在我的喜欢列表页面取消喜欢时，切回标签页不需要重新发送请求便能展示最新数据 (`List Optimistic UI`)

## 打包体积优化记录

今天(2019/07/22)觉得很有必要把优化打包体积的过程给记录一下，至于以前的优化记录，如 `antd` 与 `lodash` 依赖的移除，就不大详细记录了。

记录时使用 `webpack-bundle-analyzer` 这个包分析打包体积，并且把每次的报告页面放在 `/static` 下，报告的命名为 `${date}-${commit}`。

大致记录每次打包后服务端和客户端 `js` 总体积，以及首屏各项参数以及各种关键事件 (关键事件与机器，网络等也有很大相关性，仅做参考)。

### 00: ~350KB

刚开始写了两个页面，并且加上 `lodash` 和 `antd` 后的初始大小

### 01: 191.64KB/242.74KB

去除 `lodash` 与 `antd` 依赖，使打包体积大幅减小。这一步其实在半年前就已经做了，紧接着随后又写了很多页面与组件，所以在去除两者依赖后，真实的打包体积比现在还有缩减。

+ [Server Stat](https://shici.xiange.tech/static/2019-07-22-25305f34/server.html)
+ [Client Stat](https://shici.xiange.tech/static/2019-07-22-25305f34/client.html)

### 02: 176.51KB/245.02KB

集中 `gql` 管理后，在浏览器模式下可以把所有的 `query` 都是用 `loader` 打到 `common.js` 中，而这些零散的 `query` 在以前被按需加载时重复打包多次。

+ [commit 01-02 diff](https://github.com/shfshanyue/shici/commit/99d0dd58eac0f5af7271626c82d3815bb7af943a)
+ [Server Stat](https://shici.xiange.tech/static/2019-07-22-99d0dd58/server.html)
+ [Client Stat](https://shici.xiange.tech/static/2019-07-22-99d0dd58/client.html)
+ NetWwork statusBar: 18 requests | 223 KB transferred | 715 KB resources | Finish: 734 ms
+ Event: DCL 156.6 ms | FP 183.1 ms | FCP 183.1 ms | FMP 183.1 ms | Load 691.7 ms

### 03: 176.51KB/245.02KB

与 02 数据大致一致，但是与 04 只差了一个 commit，但打包体积变化巨大。为了聚焦问题，所以记了下来。

+ [Server Stat - 245.02KB](https://shici.xiange.tech/static/2019-07-31-5be6889/server.html)
+ [Client Stat - 176.51KB](https://shici.xiange.tech/static/2019-07-31-5be6889/client.html)

### 04: 176.52KB/193.25KB

当去除了 `less` 后，发现服务端的包体积竟然下降了 50+ KB，在分析图中发现原因在多个页面少打了 `next` 包进去。至于为什么会减少这么多体积，以后再做分析，先把 Stat 图记录下来

+ [commit 03-04 diff](https://github.com/shfshanyue/shici/commit/e94a1a5327623ed296dfe388eb6de6de829f084c)
+ [Server Stat - 193.25KB](https://shici.xiange.tech/static/2019-07-31-e94a1a5/server.html)
+ [Client Stat - 176.52KB](https://shici.xiange.tech/static/2019-07-31-e94a1a5/client.html)
+ NetWwork statusBar: 18 requests | 223 KB transferred | 716 KB resources | Finish: 734 ms
+ Event: DCL 156.6 ms | FP 183.1 ms | FCP 183.1 ms | FMP 183.1 ms | Load 691.7 ms

## 关注我

我一个关于前后端以及运维分享的公众号：记录我的学习与成长

<img src="https://shanyue.tech/qrcode.jpg" width="250" height="250">

我一个关于诗词分享的公众号：每天分享一篇古诗文

<img src="https://raw.githubusercontent.com/shfshanyue/shici/master/static/wechat.jpg" width="250" height="250">
