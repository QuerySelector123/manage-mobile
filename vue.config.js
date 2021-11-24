/*
 * @Description: 
 * @Version: 1.0
 * @Autor: Slifer
 * @Date: 2021-06-10 11:33:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-18 10:36:52
 */
module.exports = {
  publicPath: './',
  outputDir: process.env.VUE_APP_OUTPUT_DIR, // 打包后路径以及文件名字
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  chainWebpack: (config) => {
    // 解决热更新问题
    // config.entry('main').add('babel-polyfill');
    config.resolve.symlinks(true);
    config.module
      .rule('css')
      .test(/\.css$/)
      .oneOf('vue')
      .resourceQuery(/\?vue/)
      .end();
  },
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          outputStyle: 'expanded', // 打包生产，注释会被请清除除，px2rem-postcss的/*no*/和/*px*/都会失效，修改 options，让它不删除注释。
        },
        prependData: `@import "~@/assets/scss/element-variables.scss";` // 全局引入 scss 变量
      },
      postcss: {
        plugins: [
          require('postcss-plugin-px2rem')({
            rootValue: 35, // 新版本的是这个值
            mediaQuery: false, // （布尔值）允许在媒体查询中转换px。
            minPixelValue: 2, // 设置要替换的最小像素值(3px会被转rem)。 默认 0
          }),
        ],
      },
    },
  },
  devServer: {
    disableHostCheck: true,
    open: false, // 是否打开浏览器
    // https: true,
    hot: true,
    // progress: false
    // 代理配置
    proxy: {
      // "^/XXX": {
      //   target:
      //     process.env.NODE_ENV === "development"
      //       ? process.env.VUE_APP_URL_DEVELOPMENT
      //       : process.env.VUE_APP_URL_PRODUCTION,
      //   ws: true, // 是否启用websockets
      //   changeOrigin: true, //是否允许跨越
      //   pathRewrite: {}
      // }
      '^/invest-manage-service': {
        target: process.env.VUE_APP_URL_IP, // 本地的域名
        // target: 'https://investdev.gemdale.com', // 金地开发的ip
        // target: 'https://invest.gemdale.com', // 金地生产的ip
        // target: 'http://10.20.22.28:8080/', // 其他人的IP
        ws: true, // 是否启用websockets
        changeOrigin: true, // 是否允许跨越
        pathRewrite: {
          '^/invest-manage-service': '/invest-manage-service', // 将你的地址代理位这个 /api 接下来请求时就使用这个/api来代替你的地址
        },
      },
      '^/euicp-biz-service': {
        target: process.env.VUE_APP_URL_IP, // 本地的域名
        // target: 'https://investdev.gemdale.com', // 金地开发的域名
        // target: 'https://invest.gemdale.com', // 金地生产的ip
        // target: 'http://10.20.22.46:8080/', // 其他人的IP
        ws: true, // 是否启用websockets
        changeOrigin: true, // 是否允许跨越
        pathRewrite: {
          '^/euicp-biz-service': '/euicp-biz-service', // 将你的地址代理位这个 /api 接下来请求时就使用这个/api来代替你的地址
        },
      },
      '/foxit': {
        target: process.env.VUE_APP_ANYSHARE_IP + '/anyshare/static/foxit/', // 金地开发的域名
        // target: 'https://anyshare.gemdale.com/anyshare/static/foxit/', // 金地生产的域名
        secure: false,
        // pathRewrite: { "^/foxit": "/" },
        changeOrigin: true,
        // rejectUnauthorized: false,
      },
    },
  },
  configureWebpack: {
    devtool: process.env.NODE_ENV === 'development' ? 'eval-source-map' : undefined,
    // 解决缓存问题
    output: {
      filename: `js/[name].${new Date().getTime()}.js`,
      chunkFilename: `js/[name].${new Date().getTime()}.js`,
    },
  },
  // 通过babel显式转译一个依赖
  transpileDependencies: ['js-base64'],
};
