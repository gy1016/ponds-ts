const path = require('path');
const { merge } = require('webpack-merge');
const base = require('./webpack.base.config');
const StylelintWebpackPlugin = require('stylelint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(base, {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[contenthash].js',
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
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
      title: 'TP-任务池', // 传给模板的变量
      // 如果模式是dev，那么此时目录已经在dist下面了
      favicon: './public/favicon.ico',
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, '../dist'), // 告诉服务器从指定目录中提供静态文件，也即打包后的文件
    },
    port: 8080, // 设置端口
    open: true, // 自动打开浏览器
    hot: true, // 开启热更新
  },
});
