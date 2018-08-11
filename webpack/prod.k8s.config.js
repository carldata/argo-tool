const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const base = require('./base.config.js');

module.exports = merge(base, {
  devtool: 'source-map',
  plugins: [
     new UglifyJSPlugin({
       sourceMap: true
     }),
     new webpack.DefinePlugin({
       'process.env.NODE_ENV': JSON.stringify('production')
     }),
    new CopyWebpackPlugin([
      { from: './assets/json/config/dev.json', to: 'configuration.json', dot: true },
    ], { copyUnmodified: true })
  ]
});