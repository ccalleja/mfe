const {merge} = require('webpack-merge');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const {dependencies} = require('../package.json');

const devConfig = {
  mode: 'development',
  devServer: {
    port: 8888,
    historyApiFallback: {
      index: 'index.html',
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        'marketing': 'marketing@http://localhost:8081/remoteEntry.js'
      },
      shared: dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
