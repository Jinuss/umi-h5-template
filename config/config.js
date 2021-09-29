import { defineConfig } from 'umi';
import px2vw from 'postcss-px-to-viewport';

import proxyConfig from './proxy';
import analyzeConfig from './analyze';

var prod = process.env.SERVER_ENV === 'prod';
var host = ''; // 搭配腾讯云的静态网站托管或cdn，配置生产的api域名

export default defineConfig({
  hash: true,
  history: {
    type: 'hash',
  },
  title: '标题',
  favicon: './favicon.ico',
  publicPath: './', // 如果域名存在后缀，则使用相对路径
  define: {
    $HOST: prod ? host : '',
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  }, // 通过cdn加载react，减少包大小
  scripts: [
    'http://res2.wx.qq.com/open/js/jweixin-1.6.0.js', // 引入jssdk
    'https://unpkg.com/react@16.12.0/umd/react.production.min.js',
    'https://unpkg.com/react-dom@16.12.0/umd/react-dom.production.min.js',
  ],
  ignoreMomentLocale: true, // 忽略 moment
  nodeModulesTransform: {
    type: 'none',
  },
  cssLoader: {
    localsConvention: 'camelCase',
  },
  extraPostCSSPlugins: [
    // https://github.com/evrone/postcss-px-to-viewport/blob/master/README_CN.md
    px2vw({
      unitToConvert: 'px',
      viewportWidth: 750,
      unitPrecision: 5,
      propList: ['*'],
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      selectorBlackList: ['am-'],
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      exclude: undefined,
      include: undefined,
      landscape: false,
      landscapeUnit: 'vw',
      landscapeWidth: 568,
    }),
  ],
  extraBabelPlugins: [
    ['import', { libraryName: 'antd-mobile', style: true }], //按需加载antd-mobile样式文件
  ],
  ...proxyConfig,
  ...analyzeConfig,
});
