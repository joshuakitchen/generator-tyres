'use strict'

const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const SRC_PATH = path.resolve(__dirname, 'src', 'client')
const DST_PATH = path.resolve(__dirname, 'static')

module.exports = {
  entry: [
    path.resolve(SRC_PATH, 'ts', 'index.tsx'),
    path.resolve(SRC_PATH, 'scss', 'index.scss')
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: path.resolve(SRC_PATH, 'ts', 'tsconfig.json')
          }
        }
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          process.env.NODE_ENV === 'development'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  output: {
    path: path.resolve(DST_PATH, 'js')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(SRC_PATH, 'ts', 'tsconfig.json')
      })
    ]
  },
  plugins:
    process.env.NODE_ENV === 'development'
      ? []
      : [new MiniCssExtractPlugin({ filename: '../css/[name].css' })]
}
