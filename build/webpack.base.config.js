const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { getThemeVariables } = require('antd/dist/theme');

// C:\Users\18389\Desktop\ponds-ts\src\assets
console.log(path.resolve(__dirname, '../src', 'assets'));

module.exports = {
  // 即使在build目录下，也不用写成../src/index.tsx
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: getThemeVariables({
                  dark: false, // 开启暗黑模式
                  compact: false, // 开启紧凑模式
                }),
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        type: 'asset',
        generator: {
          // 输出文件位置以及文件名
          // [ext] 自带 "." 这个与 url-loader 配置不同
          filename: '[name][hash:8][ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 50 * 1024, //超过50kb不转 base64
          },
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              symbolId: 'icon-[name]', // 将图标名称作为导出的 id
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [new MiniCssExtractPlugin(), new CleanWebpackPlugin()],
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename], // 构建依赖的config文件（通过 require 依赖）内容发生变化时，缓存失效
    },
  },
};
