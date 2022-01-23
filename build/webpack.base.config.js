const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { getThemeVariables } = require('antd/dist/theme');

// C:\Users\18389\Desktop\ponds-ts\src\assets
// console.log(path.resolve(__dirname, '../src', 'assets'));

module.exports = {
  // 即使在build目录下，也不用写成../src/index.tsx
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'scripts/[name].[contenthash].js',
    // 不再需要CleanWebpackPlugin
    clean: true,
    // 资源模块的文件名
    // assetModuleFilename: 'images/[contenthash][ext]',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              // 构建过程中，关闭类型检查
              transpileOnly: true,
            },
          },
          // 针对耗时大的任务，他的启动也是有开销的
          // {
          //   loader: 'thread-loader',
          //   options: {
          //     workers: 2,
          //   },
          // },
        ],
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
          // {
          //   loader: 'css-loader',
          //   options: {
          //     modules: true,
          //   },
          // },
          'css-loader',
          'postcss-loader',
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
        // 优先级高于output中的assetModuleFilename
        generator: {
          // 输出文件位置以及文件名
          // [ext] 自带 "." 这个与 url-loader 配置不同
          // 与output中的assetModuleFilename作用相同
          filename: 'images/[name][contenthash:8][ext]',
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
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public', 'index.html'),
      filename: 'index.html', // 输出后的文件名，路径是 output.path
      title: 'TP-任务池',
      // 将script标签注入到body
      inject: 'body',
      // 如果模式是dev，那么此时目录已经在dist下面了
      favicon: './public/favicon.ico',
      // 配合entry选项选择载入模板的chunk
      // 设置多个HtmlWebpackPlugin就可以做多页面应用了
      // chunks: ['']
    }),
  ],
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename], // 构建依赖的config文件（通过 require 依赖）内容发生变化时，缓存失效
    },
  },
  optimization: {
    // tree shaking
    usedExports: true,
    splitChunks: {
      // chunks: 'all',
      // 缓存第三方库的代码
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};

// 资源模块 assets module
// asset/resource 发送一个单独的文件并导出url ————打包好一个文件，并引入该文件url
// asset/inline 会导出一个资源的Data url ————base64
// asset/source 会导出资源的源代码 ————主要用于文本
// asset 会在导出一个url和发送一个单独的文件之间自动进行选择
