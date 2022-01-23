const path = require('path');
const base = require('./webpack.base.config');
const StylelintWebpackPlugin = require('stylelint-webpack-plugin');
const { merge } = require('webpack-merge');

module.exports = merge(base, {
  mode: 'development',
  output: {
    sourceMapFilename: 'sourcemap/[name].[contenthash].js.map',
  },
  plugins: [
    new StylelintWebpackPlugin({
      configFile: path.resolve(__dirname, '../.stylelintrc.js'),
      files: ['src/**/*.{less,css}'],
      customSyntax: 'postcss-less',
      fix: true,
      lintDirtyModulesOnly: true,
      threads: true,
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, '../dist'),
    },
    compress: true,
    port: 9527,
    open: true,
    hot: true,
    proxy: {
      // '/api': 'http://localhost:9000',
    },
    historyApiFallback: true,
  },
  devtool: 'cheap-module-source-map',
});
