const { DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./webpack.common')
const { merge } = require('webpack-merge')

module.exports = merge(common, {
  mode: 'development',
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  output: {
    pathinfo: false,
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
        },
      },
      {
        test: /\.css$/,
        loader: 'css-loader',
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  devServer: {
    static: './dist',
    historyApiFallback: true,
    devMiddleware: {
      writeToDisk: true,
    },
    hot: true,
    port: 8080,
  },
  devtool: 'inline-source-map',
  plugins: [
    new DefinePlugin({
      'process.env.API_URL': JSON.stringify(''),
    }),
    new HtmlWebpackPlugin({
      template: './template.dev.html',
      favicon: './public/favicon.png'
    }),
  ],
  cache: true,
})
