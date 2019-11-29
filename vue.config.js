const path = require('path')
const NODE_ENV = process.env.NODE_ENV

const GLOBAL_CONFIG = {
  APP_VERSION: '"20191031"', // 更新版本号后会情况 localStorage
  WX_APPID: '"wx90151de7e08501fc"',
  AUTH_HOST: '"http://m.liaofy.com"',
  eruda: NODE_ENV === 'development' && JSON.stringify('//cdn.jsdelivr.net/npm/eruda')
}


module.exports = {
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.json', '.vue', '.vue.js'],
      alias: {
        '@': path.resolve(__dirname, './src'),
      }
    }
  },

  chainWebpack: config => {
    // 添加自定义环境变量
    config.plugin('define')
    .tap(args => {
      args[0] = {
        ...args[0],
        "process.env": GLOBAL_CONFIG
      };
      return args
    })
  },

  lintOnSave: process.env.NODE_ENV === 'production'
};
