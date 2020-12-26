const {merge} = require('webpack-merge');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const {dependencies} = require('../package.json');
const port = 8888;

const devConfig = {
  mode: 'development',
  devServer: {
    port: port,
    historyApiFallback: {
      index: 'index.html',
    },
  },
  output: {
    publicPath: `http://localhost:${port}/`
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        'marketing': 'marketing@http://localhost:8081/remoteEntry.js',
        'auth': 'auth@http://localhost:8082/remoteEntry.js',
        'dashboard': 'dashboard@http://localhost:8083/remoteEntry.js',
      },
      shared: dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
