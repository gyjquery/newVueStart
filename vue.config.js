const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'

// 是否使用gzip
const productionGzip = true
// 需要gzip压缩的文件后缀
const productionGzipExtensions = ['js', 'css']

// cdn预加载使用
const externals = {
  // vue: 'Vue',
  // 'vue-router': 'VueRouter',
  // vuex: 'Vuex',
  // axios: 'axios',
  // 'js-cookie': 'Cookies'
}

const cdn = {
  // 开发环境
  dev: {
    css: [],
    js: []
  },
  // 生产环境
  build: {
    css: [],
    js: [
      // '/plugins/vue/vue.min.js',
      // '/plugins/vue/vue-router.min.js',
      // '/plugins/vue/vuex.min.js',
      // '/plugins/axios/axios.min.js',
      // '/plugins/js-cookie/js.cookie.min.js'
    ]
  }
}

module.exports = {
  productionSourceMap: false,
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      if (isProduction) {
        args[0].cdn = cdn.build
      } else {
        args[0].cdn = cdn.dev
      }
      return args
    })
  },

  configureWebpack: config => {
    const myConfig = {}

    myConfig.plugins = [
      // load `moment/locale/zh-cn.js` and `moment/locale/en-us.js`
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn|en-us/)
    ]
    myConfig.optimization = {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              drop_console: true, // console
              drop_debugger: false,
              pure_funcs: ['console.log'] // 移除console
            }
          }
        })
      ]
    }
    if (isProduction) {
      myConfig.externals = externals
      productionGzip &&
        myConfig.plugins.push(
          new CompressionWebpackPlugin({
            test: new RegExp(
              '\\.(' + productionGzipExtensions.join('|') + ')$'
            ),
            threshold: 8192,
            minRatio: 0.8
          })
        )
    }

    return myConfig
  },

  devServer: {
    disableHostCheck: true,
    port: 8081,
    proxy: {
      '/rest/rest': {
        // target: 'http://192.168.43.205:8080',
        target: 'http://218.60.2.253:8087',
        // target: 'http://192.168.43.194:8080',
        // target: 'http://192.168.1.103:8080',
        changeOrigin: true
      }
    }
  }
}
