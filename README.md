# 使用 `umi3.0` 开发 `h5` 项目

## demo

[访问 demo](https://test-9gwkw9rfef84c2f6-1254005732.tcloudbaseapp.com/umi3/h5/index.html)

## 重要依赖

- umi@3
- antd-mobile
- ahooks
- dayjs

## 开始项目

安装依赖,

```bash
$ yarn
```

开启服务,

```bash
$ yarn start
```

## 修改端口

打开 [.env](./.env) 文件，设置服务端口      

## 在项目中引用图片

1. 将需要使用的图片放置于 `assets` 目录下
2. 在 `jsx` 中使用
```
<img src={require('@/assets/logo.jpg')}>
```
3. 在 `css` 中使用
```
background: url('~@/assets/logo.jpg');
```


## 相关配置

前往项目 [配置文件](./config/config.js)      


## 重点配置

- ### 使用哈希路由

```
history: {
  type: 'hash',
}
```

- ### 移动端字体大小自适应

使用 `postcss-px-to-viewport` 插件实现     

- ### 指定本地服务的代理

前往 [proxy](./config/proxy.js) 进行设置

## 自定义hook

- `useWxAuth`    
用于微信公众号h5授权
  
- `useWxConfig`   
用于微信公众号 `h5` 对接 `jssdk`

## 开发约定

- 拥抱 `React Hooks`
- `model` 使用 `hooks` 写法
- 使用 `dayjs` 替换 `moment`

## 优化打包文件

将 `react` 库通过 `cdn` 引入，减少包大小，配置如下，如果存在其他较大的第三方库，也可以通过做如下配置

```
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  scripts: [
    'https://unpkg.com/react@16.12.0/umd/react.production.min.js',
    'https://unpkg.com/react-dom@16.12.0/umd/react-dom.production.min.js',
  ],
```

## 对接腾讯云静态网站托管

[参考文档](https://cloud.tencent.com/document/product/876/40270)

### 优点

- 不需要自己的服务器，支持 `cdn`，每月有 `5GB` 免费流量额度
- 部署简单，官方提供了 `cli`，通过命令一键部署

### 如何在该项目中使用

[参考文档](https://cloud.tencent.com/document/product/876/41539)

1. 安装 `CLI`

```bash
yarn global add @cloudbase/cli
```

2. 登录腾讯云 `CLI`

``` bash
tcb login
```

3. 打开 [`package.json`](./package.json) ，修改 `upload` 命令中的 `cloudPath` 和 `envId`

```
"upload": "tcb hosting deploy ./dist cloudPath -e envId",
```

4. 部署到静态网站托管

``` bash
$ yarn deploy
```