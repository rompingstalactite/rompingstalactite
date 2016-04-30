var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './client/index.js',
  output: { path: __dirname, filename: '/client/bundle.js' },
  devtool: 'source-map',
  module: {
    loaders: [
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
    ]
  }
};
