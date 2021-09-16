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
  }
}
