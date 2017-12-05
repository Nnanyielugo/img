// webpack.config.js for Babel 6
var path = require('path');
var webpack = require('webpack');

var config = {
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
					test: /\.css$/,            
					use: [
							{
									loader: "style-loader"
							},
							{
									loader: "css-loader",
									options:{
											modules: true
									}
							}
					]
			},{
					test: /\.scss$/,            
					use: [
							{
									loader: "style-loader"
							},
							{
									loader: "css-loader",
									options:{
											modules: true
									}
							},
							{
									loader: "sass-loader",
									options:{
											modules: true
									}
							}
					]
							//when installing these modules, install node-sass to make the scss work
					
			}
		]
	}
};

module.exports = config;