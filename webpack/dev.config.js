const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./base.config.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const mockWorkFiles = [
  { from: './assets/json/config/dev-mock.json', to: 'configuration.json', dot: true },
  { from: './assets/json/sites.json' },
  { from: './assets/json/envelope.json' },
  { from: './assets/json/storm-event.json' }
];

const realWorkFiles = [
  { from: './assets/json/config/dev.json', to: 'configuration.json', dot: true },
  { from: './assets/json/sites.json' },
]

module.exports = merge(base, {
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin(realWorkFiles, { copyUnmodified: true })
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