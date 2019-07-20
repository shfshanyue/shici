# 诗词弦歌

出于个人兴趣做的一个网站作为自己技术上的试验田，相配套的后端自己也抽了出来做了脚手架 [apollo-server-starter](https://github.com/shfshanyue/apollo-server-starter)

![诗词弦歌](https://shici.xiange.tech/static/screen.png)

## 技术栈

+ [react](https://github.com/facebook/react), [next.js](https://github.com/zeit/next.js), [next-routes](https://github.com/fridays/next-routes) -- 服务端渲染
+ [GrapqhQL](https://github.com/koajs/koa), [apollo-client](https://github.com/apollographql/apollo-client) -- API && store
+ `docker`, `docker-compose`, `traefik`, `gitlab-ci` -- 部署

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
+ [ ] 添加经史子集
+ [ ] 在诗词的赏析中为其所引用到的古籍添加链接
+ [ ] typescript 支持
+ [ ] eslint 支持
+ [ ] Sentry 支持
+ [ ] 图片优化
+ [ ] 添加错误提示组件
+ [ ] 更好的 dockerfile，更快的构建速度
+ [ ] 更好的 CI pipeline
+ [ ] 当出现 404 页面时，返回真正的 404 状态码，优化 SEO
+ [ ] 状态优化: 在我的喜欢列表页面取消喜欢时，切回标签页不需要重新发送请求便能展示最新数据 (`List Optimistic UI`)

## 相关思考与文章

+ [关于诗词的 GraphQL API](https://shanyue.tech/post/shici-api/)
+ [如何实现类似 lodash 的 get 与 merge 函数](https://shanyue.tech/post/lodash-get-and-merge/)
+ [使用 enum 代替 constant number](https://shanyue.tech/post/constant-db-to-client/)
+ [使用纯 CSS 实现仿 Material Design 的 input 过渡效果](https://shanyue.tech/post/login-input-style/)
+ [当我有一台服务器时，我做了什么](https://shanyue.tech/post/server-todo/)

## 捐献

<img src="https://shanyue.tech/pay.jpg" width="250" height="250">
