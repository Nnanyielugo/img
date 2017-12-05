// webpack.config.js for Babel 6
const path = require('path');
const webpack = require('webpack');

const config = {
	entry: './src/index.js',
	output: { path: __dirname + '/public/js', filename: 'react-app.js' },
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: [{
						loader: "babel-loader",
						options: {
								babelrc: false,
								presets: [
									'react', 'es2015', 'stage-0'
								]
						}
				}]
			},{
				test: /\.(png|jp(e*)g|svg)$/,  
				use: [{
						loader: 'url-loader',
						options: { 
								limit: 28000, // Convert images < 8kb to base64 strings
								name: 'images/[hash]-[name].[ext]'
						} 
				}]
		}
		]
	}
};

module.exports = config;