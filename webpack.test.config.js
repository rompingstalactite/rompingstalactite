var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './tests/entry.js',
  output: { path: __dirname, filename: '/tests/test.bundle.js' },
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
        test: /.test.js$/,
        loader: 'mocha-loader',
        exclude: /node_modules/
      },
    ]
  }
};
// module.exports = {
//     entry: 'mocha!./entry-file.js',
//     output: {
//         path: __dirname,
//         filename: 'bundle.js'
//     }
// }
