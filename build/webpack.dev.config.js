const path = require('path');
const base = require('./webpack.base.config');
const StylelintWebpackPlugin = require('stylelint-webpack-plugin');
const { merge } = require('webpack-merge');

module.exports = merge(base, {
  mode: 'development',
  output: {
    // 一定记得加斜线
    sourceMapFilename: 'sourcemap/[name].[contenthash].js.map',
  },
  plugins: [
    new StylelintWebpackPlugin({
      configFile: path.resolve(__dirname, '../.stylelintrc.js'),
      files: ['src/**/*.{less,css}'],
      customSyntax: 'postcss-less', // 适配 less 语法
      fix: true, // 自动格式化
      lintDirtyModulesOnly: true, // 仅检查变化的代码
      threads: true, // 多线程
    }),
  ],
  // 将打包后的bundle放到了内存里，自己没有输出任何东西
  // 删掉dist文件也是正常运行的
  devServer: {
    // 指向当前服务的物理路径
    static: {
      directory: path.resolve(__dirname, '../dist'), // 告诉服务器从指定目录中提供静态文件，也即打包后的文件
    },
    compress: true,
    port: 9527, // 设置端口
    open: true, // 自动打开浏览器
    hot: true, // 开启热更新
    // 其他小伙伴可以通过访问我得服务
    // host: '0.0.0.0',
    // 自定义响应头
    // headers: {
    //   'X-Access-Token': '',
    // },
    proxy: {
      // '/api': 'http://localhost:9000',
    },
    // https: true,
    historyApiFallback: true,
  },
  // 默认source-map为eval
  // 不会单独把source-map文件打包出来，会在末尾添加类似base64链接，可以锁定代码行数
  // eval-source-map不会生成source-map文件，也可以锁定代码行数
  // cheap-source-map——只记录行树，不记录列数
  // hidden-source-map会取消掉在末尾追加的那一行source-url，不能在锁定行数，但会生成map文件，且与压缩后代码没有关联
  // source-map——行数列数都记录
  // 开发环境推荐！！！！
  // cheap-module-source-map——单独生成map文件，而且不记录列数，并且对于babel这种解析的source-map混杂进来以后，也不会导致代码行数的一个识别问题
  devtool: 'cheap-module-source-map',
});
