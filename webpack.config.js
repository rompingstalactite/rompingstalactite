var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './client/index.js',
  output: { path: __dirname, filename: '/client/bundle.js' },
  devtool: 'source-map',
  resolve: {
    extensions: ["", ".js", ".jsx", ".json"],
    alias: {
      'sinon': 'sinon/pkg/sinon'
    }
  },
  module: {
    loaders: [
      {
        test: /sinon.*\.js$/,
        loader: "imports?define=>false,require=>false",
      },
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css?sourceMap", "sass?sourceMap"]
      },
      {
        test: /\.json$/,
        loaders: ['json']
      },
    ],
    noparse: [
      /sinon/,
    ],
  },
  externals: {
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window',
    'react/addons': true,
    'jsdom': 'window',
  }
};
