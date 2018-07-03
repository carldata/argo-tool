const _ = require("lodash");
const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  /*
    * app.ts represents the entry point to your web application. Webpack will
    * recursively go through every "require" statement in app.ts and
    * efficiently build out the application's dependency tree.
    */
  entry: ["./src"],
  devtool: "eval-source-map",
  /*
    * The combination of path and filename tells Webpack what name to give to
    * the final bundled JavaScript file and where to store this file.
    */
  // output: {
  //   path: path.resolve(__dirname, "../dist"),
  //   filename: "bundle.js"
  // },
  module: {
    /*
      * Each loader needs an associated Regex test that goes through each
      * of the files you've included (or in this case, all files but the
      * ones in the excluded directories) and finds all files that pass
      * the test. Then it will apply the loader to that file.
      */
    rules: [{
        test: /\.(ts|tsx)(\?.*)?$/,
        loaders: ['ts-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
      }
    ]
  },
  /*
   * resolve lets Webpack now in advance what file extensions you plan on
   * "require"ing into the web application, and allows you to drop them
   * in your code.
   */
  resolve: {
    // modules: [
    //   "node_modules",
    //   path.resolve(__dirname, "../src")
    // ],
    extensions: [".js", ".ts", ".json", ".jsx", ".tsx", ".css", ".scss"],
    alias: {
      "@business-logic": path.resolve(__dirname, '../src/common/business-logic'),
      "@components": path.resolve(__dirname, '../src/common/components'),
      "@models": path.resolve(__dirname, '../src/common/models'),
      "@store":  path.resolve(__dirname, '../src/store'),
      "@screens": path.resolve(__dirname, '../src/screens'),
      "@routes":  path.resolve(__dirname, '../src/routes')
    }
  },
  target: "web"
}
