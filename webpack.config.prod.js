var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.config.base');

config.output.publicPath = 'http://m.haitaocity.com/dist/js/';

config.plugins.push(
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: '"production"'
		}
	}),
	new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false
		}
	})
);

module.exports = config;