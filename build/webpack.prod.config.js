const { merge } = require('webpack-merge');
const base = require('./webpack.base.config');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = merge(base, {
  mode: 'production',
  output: {
    // 一定记得加斜线
    // publicPath: 'http://localhost:8080/',
    // sourceMapFilename: 'sourcemap/[name].[contenthash].js.map',
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled', // 不启用分析器
      generateStatsFile: true,
      statsFilename: 'stats.json',
    }),
    new CompressionWebpackPlugin({
      test: /\.(js|tff|css|html|svg|png)$/,
      threshold: 10240, // 对超过10k的数据压缩
    }),
    // 与base中是两个对象不会合并
    // new HtmlWebpackPlugin({
    //   cdn: {
    //     js: [
    // 'https://unpkg.com/react@17/umd/react.production.min.js',
    // 'https://unpkg.com/react-dom@17/umd/react-dom.production.min.js',
    // 'https://cdn.jsdelivr.net/npm/axios@0.24.0/dist/axios.min.js',
    // 'https://cdn.jsdelivr.net/npm/react-router-dom@6.0.2/umd/react-router-dom.production.min.js',
    // 'https://cdn.bootcdn.net/ajax/libs/moment.js/2.29.1/locale/af.min.js',
    //     ],
    //   },
    // }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      // 压缩CSS代码
      new CssMinimizerPlugin(),
      // 压缩JS代码
      new TerserPlugin({
        terserOptions: {
          compress: {
            pure_funcs: ['console.log'],
          },
        },
      }),
    ],
  },
  // 使用这种方式引入CDN，index.html里并没有cdn的链接引入，
  // 是在运行时才引入的
  externalsType: 'script',
  externals: {
    // react: 'React',
    // 'react-dom': 'ReactDOM',
    axios: ['https://cdn.jsdelivr.net/npm/axios@0.24.0/dist/axios.min.js', 'axios'],
    // 'react-router-dom': 'ReactRouterDOM',
    // moment: ['https://cdn.bootcdn.net/ajax/libs/moment.js/2.29.1/locale/af.min.js', 'moment'],
  },
  // 生产环境不推荐有source-map
  // devtool: 'source-map',
  // 把打包过程中的性能提示去掉
  performance: {
    hints: false,
  },
});
