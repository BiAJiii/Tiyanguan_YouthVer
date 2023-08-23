module.exports = {
    plugins: {
      autoprefixer: {
        overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8']
      },
      'postcss-pxtorem': {
        rootValue:37.5, 
        replace:true,
        mediaQuery:true,
        minPixeValue:1,
        propList: ['*'],
        exclude:/node_modules/i
      }
    }
  }