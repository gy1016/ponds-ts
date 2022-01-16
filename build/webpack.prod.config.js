const path = require('path');
const { merge } = require('webpack-merge');
const base = require('./webpack.base.config');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = merge(base, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[contenthash].js',
    sourceMapFilename: 'sourcemap/[name].[contenthash].js.map',
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled', // 不启用分析器
      generateStatsFile: true,
      statsFilename: 'stats.json',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public', 'index.html'),
      filename: 'index.html', // 输出后的文件名，路径是 output.path
      title: 'TP-任务池',
      favicon: './public/favicon.ico',
      cdn: {
        js: [
          'https://cdn.bootcdn.net/ajax/libs/react/17.0.2/umd/react.production.min.js',
          'https://cdn.bootcdn.net/ajax/libs/react-dom/17.0.2/umd/react-dom.production.min.js',
          'https://cdn.jsdelivr.net/npm/axios@0.24.0/dist/axios.min.js',
          'https://cdn.jsdelivr.net/npm/react-router-dom@6.0.2/umd/react-router-dom.production.min.js',
          'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js',
        ],
      },
    }),
    new CompressionWebpackPlugin({
      test: /\.(js|tff|css|html|svg)$/,
      threshold: 10240, // 对超过10k的数据压缩
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        terserOptions: {
          compress: {
            pure_funcs: ['console.log'],
          },
        },
      }),
    ],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    axios: 'axios',
    'react-router-dom': 'ReactRouterDOM',
    moment: 'moment',
  },
  devtool: 'source-map',
});
