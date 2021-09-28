/*
 * @Author: your name
 * @Date: 2020-11-06 09:42:37
 * @LastEditTime: 2021-03-22 16:10:24
 * @LastEditors: wanjikun
 * @Description: In User Settings Edit
 * @FilePath: \vue-ts\vue.config.js
 */
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  lintOnSave: false,
  publicPath: "./",
  productionSourceMap: false, // 全掉打包的map文件减小打包文件大小 项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错,
  chainWebpack: config => {
    console.log("process.env.NODE_ENV", process.env.NODE_ENV);
    config.when(process.env.NODE_ENV !== "development", config => {
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          },
          vendors: {
            name: "chunk-vendors",
            test: /[\\/]node_modules[\\/]/,
            chunks: "initial",
            priority: 2,
            reuseExistingChunk: true,
            enforce: true
          },
          vant: {
            name: "chunk-vant",
            test: /[\\/]node_modules[\\/]vant[\\/]/,
            chunks: "initial",
            priority: 3,
            reuseExistingChunk: true,
            enforce: true
          }
        }
      });
      // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
      config.optimization.runtimeChunk("single"); // 分离运行时代码
    });
  },
  devServer: {
    disableHostCheck: true
  }
};
