## 项目简介

食堂订单项目的商家端/管理端 app 开发部分

## 当前进度


### 技术栈

- IDE：[HBuilderX]（整了好久的 vscode 配置，好麻烦，还是就用这个玩意吧）
- 前端框架：[uni-app](https://uniapp.dcloud.net.cn/) (Vue3 + TS )
- 状态管理：[pinia](https://pinia.vuejs.org/zh/)
- 组件库：[uni-ui](https://uniapp.dcloud.net.cn/component/uniui/uni-ui.html)
  【思来想去还是用官方的组件库，简单高效】

## 资料说明

### 📗 接口文档

【待更新】

## HBX 插件安装说明

都在 DCloud 插件市场，自行配置下载
1.easy-git 和 git 插件
2.formatAndSave
3.eslint-plugin-vue

## 运行程序

1. 安装依赖

```shell
# npm（慢！）
npm i

# pnpm （建议最好去配置一下pnpm）
pnpm i
```

2. 运行程序

```shell
# 微信小程序端
npm run dev:mp-weixin

# H5端
npm run dev:h5

# App端
需 HbuilderX 工具，运行 - 运行到手机或模拟器
```

### 工程结构解析

```
├── .husky                     # Git Hooks
├── dist                       # 打包文件夹（可删除重新打包）
├── src                        # 源代码
│   ├── components             # 全局组件
│   ├── composables            # 组合式函数
│   ├── pages                  # 主包页面
│       ├── index               # 首页
│       ├── category            # 分类页
│       ├── cart                # 购物车
│       ├── my                  # 我的
│       └── login               # 登录页
│   ├── services               # 所有请求
│   ├── static                 # 存放应用引用的本地静态资源的目录
│       ├── images              # 普通图片
│       └── tabs                # tabBar 图片
│   ├── stores                 # 全局 pinia store
│       ├── modules             # 模块
│       └── index.ts            # store 入口
│   ├── styles                 # 全局样式
│       └── fonts.scss          # 字体图标
│   ├── types                  # 类型声明文件
│       └── component.d.ts      # 全局组件类型声明
│   ├── utils                  # 全局方法
│   ├── App.vue                # 入口页面
│   ├── main.ts                # Vue初始化入口文件
│   ├── pages.json             # 配置页面路由等页面类信息
│   ├── manifest.json          # 配置appid等打包信息
│   └── uni.scss               # uni-app 内置的常用样式变量
├── .editorconfig              # editorconfig 配置
├── .eslintrc.cjs              # eslint 配置
├── .prettierrc.json           # prettier 配置
├── .gitignore                 # git 忽略文件
├── index.html                 # H5 端首页
├── package.json               # package.json 依赖
├── tsconfig.json              # typescript 配置
└── vite.config.ts             # vite 配置
```
