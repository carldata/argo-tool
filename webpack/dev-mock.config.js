const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./base.config.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const files = [
  { from: './assets/json/config/dev-mock.json', to: 'configuration.json', dot: true }
];

module.exports = merge(base, {
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin(files, { copyUnmodified: true })
  ],
  devServer: {
    proxy: {
      '/api': 'http://localhost:3000'
    },
    historyApiFallback: true,
    hot: true,
    noInfo: true,
    port: 9000
  },
});