// // 生成 pages.json, mainifest.json, routes.js
// require('./gen-config');
const path = require('path');
const env = require('./src/config/env');
const appName = process.env.APP_NAME;
const nodeEnv = process.env.NODE_ENV;

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
    if (appName && nodeEnv) {
      // 添加自定义环境变量
      config.plugin('define')
        .tap(args => {
          args[0] = {
            ...args[0],
            "process.env.UNI_PLATFORM": JSON.stringify(process.env.UNI_PLATFORM),
            "process.env.APP_NAME": JSON.stringify(appName),
            "process.env.APP_SETTING": JSON.stringify(env[appName][nodeEnv])
          };
          return args;
        })
    }

    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.transformAssetUrls = {
          image: 'src'
        };
        return options;
      });

    config.module.rules.delete('svg');
    config.module.rule('images')
      .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .tap(() => {
        let publicPath = nodeEnv === 'production' ? env[appName][nodeEnv].H5_CDN_URL : '/cdn/';
        return {
          // 小程序background不能用本地路径，开发时base64，发布时用cdn
          limit: nodeEnv === 'production' ? -1 : 0,
          fallback: {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:8].[ext]',
              outputPath: 'cdn/img/',
              publicPath: publicPath + 'img/'
            }
          }
        };
      });
  },

  lintOnSave: process.env.NODE_ENV === 'production'
};
