var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'build/client');
var APP_DIR = path.resolve(__dirname, 'src/client');

var config = {
  entry:  {
	app: APP_DIR + '/app/index.js',
	//'index.html': APP_DIR + '/index.html'
  },
  output: {
    path: BUILD_DIR + '/js',
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      { test : /\.js$/, include : APP_DIR, loader : 'babel-loader' },
	  { test : /\.json$/, include : APP_DIR, loader : 'json-loader' },
	  { test : /\.html$/, include : APP_DIR, loader : 'file-loader?name=[name].[ext]' }
    ]
  },
  devServer: {
    port: 8888,
	contentBase: path.join(__dirname, "src/client"),
    compress: false,
    host: "localhost"
  }
};

module.exports = config;
