module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    // [
    //   'import',
    //   {
    //     libraryName: 'vant',
    //     libraryDirectory: 'es',
    //     style: true
    //   },
    //   'vant'
    // ],
    // [
    //   'component',
    //   {
    //     libraryName: 'element-ui',
    //     styleLibraryName: 'theme-chalk'
    //   }
    // ],
    //
    // [
    //   'import',
    //   {
    //     libraryName: 'gwell-ui',
    //     camel2DashComponentName: false, //关闭驼峰自动转链式
    //     camel2UnderlineComponentName: false, //关闭蛇形自动转链式
    //     style: (name) => {
    //       const cssName = name.split('/')[2]
    //       return `gwell-ui/lib/style/${cssName}.css`
    //     }
    //   },
    //   'gwell-ui'
    // ]

    // babel-plugin-component
    [
      'component',
      {
        libraryName: 'gwell-ui',
        libDir: 'lib/es',
        camel2Dash: false
      },
      'gwell-ui'
    ]
  ]
}
