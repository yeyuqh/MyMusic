module.exports = {
  chainWebpack: (config) => {
    // 配置全局 sass 变量
    //* https://www.npmjs.com/package/sass-resources-loader#vuejs-webpack-templatevue-cli3
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach((item) => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({ resources: ['./src/styles/variables.scss', './src/styles/mixin.scss'] })
        .end()
    })
  }
}