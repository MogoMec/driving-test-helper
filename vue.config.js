module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      '/driverexamQuery': {
        target:
          'https://way.jd.com//jisuapi/driverexamQuery?appkey=e6dab253d0240567bd548823256a7f20&', // 真实请求的地址
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/driverexamQuery': ''
        }
      }
    }
  },
  chainWebpack: config => {
    // 发布模式
    config.when(process.env.NODE_ENV === 'production', config => {
      config
        .entry('app')
        .clear()
        .add('./src/main-prod.js')

      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        vuex: 'Vuex'
      })

      config.plugin('html').tap(args => {
        args[0].isProd = true
        return args
      })
    })

    // 开发模式
    config.when(process.env.NODE_ENV === 'development', config => {
      config
        .entry('app')
        .clear()
        .add('./src/main-dev.js')

      config.plugin('html').tap(args => {
        args[0].isProd = false
        return args
      })
    })
  }
}
