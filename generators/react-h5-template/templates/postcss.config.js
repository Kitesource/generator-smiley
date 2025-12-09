export default {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: ['> 1%', 'last 3 versions', 'Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31']
    },
    'postcss-pxtorem': {
      // 根据设计稿宽度设置，通常是 375px（iPhone 6/7/8）
      rootValue: 37.5, // 1rem = 37.5px，适合 750px 宽度的设计稿
      propList: ['*'], // 需要转换的属性，* 表示所有属性
      selectorBlackList: [], // 忽略的选择器
      minPixelValue: 2, // 小于 2px 的值不转换
      mediaQuery: false, // 是否在媒体查询中转换 px
      replace: true, // 是否直接替换值而不是添加备用值
      exclude: /node_modules/i, // 忽略 node_modules 目录下的文件
      include: undefined, // 如果设置了include，就只包含匹配的文件
      landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
      landscapeUnit: 'rem', // 横屏时使用的单位
      landscapeWidth: 568 // 横屏时使用的视口宽度
    }
  }
}
