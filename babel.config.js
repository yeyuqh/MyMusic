module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    // element-plus 按需引入
    [
      'import',
      {
        libraryName: 'element-plus',
        styleLibraryName: 'theme-chalk'
      }
    ]
  ]
}
