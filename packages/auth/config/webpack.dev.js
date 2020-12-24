const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const {dependencies} = require('../package.json');
const port = 8082;

const devConfig = {
  mode: 'development',
  devServer: {
    port: port,
    historyApiFallback: {
      index: 'index.html',
    },
  },
  output:{
    publicPath: `http://localhost:${port}/`
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'auth',
      filename: 'remoteEntry.js',
      exposes: {
        './AuthApp': './src/bootstrap'
      },
      shared: dependencies,
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
