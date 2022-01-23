const { merge } = require('webpack-merge');
const base = require('./webpack.base.config');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = merge(base, {
  mode: 'production',
  output: {
    // publicPath: 'http://localhost:8080/',
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true,
      statsFilename: 'stats.json',
    }),
    new CompressionWebpackPlugin({
      test: /\.(js|tff|css|html|svg|png)$/,
      threshold: 10240,
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
  externalsType: 'script',
  externals: {
    axios: ['https://cdn.jsdelivr.net/npm/axios@0.24.0/dist/axios.min.js', 'axios'],
  },
  performance: {
    hints: false,
  },
});
