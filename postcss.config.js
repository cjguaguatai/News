module.exports = {
  plugins: {
    // postcss-pxtorem 插件的版本需要 >= 5.0.0
    'postcss-pxtorem': {
      // rootValue ({ file }) {
      //   return file.indexOf('vant') !== -1 ? 37.5 : 75
      // },
      rootValue: (module) => {
        return (/vant/gi.test(module.file) ? 37.5 : 75)
      },
      propList: ['*']
    }
  }
}
