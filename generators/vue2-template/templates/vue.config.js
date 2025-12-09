const { defineConfig } = require('@vue/cli-service')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    // plugins: [new BundleAnalyzerPlugin()]
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "~@/styles/global.scss";
        `
      }
    }
  }
})
