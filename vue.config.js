module.exports = {
  publicPath: '/deskManager/',
  outputDir: 'dist',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://zelfly.com:81', // 对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
