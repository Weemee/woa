const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const sassVars = require(__dirname + '/engine/modules/session/themes');
const sass = require('node-sass');
const sassUtils = require('node-sass-utils')(sass);

const convertStringToSassDimension = function(result) {
	// Only attempt to convert strings
	if (typeof result !== 'string') {
	  return result;
	}
 
	const cssUnits = [
	  'rem',
	  'em',
	  'vh',
	  'vw',
	  'vmin',
	  'vmax',
	  'ex',
	  '%',
	  'px',
	  'cm',
	  'mm',
	  'in',
	  'pt',
	  'pc',
	  'ch',
	];
	const parts = result.match(/[a-zA-Z]+|[0-9]+/g);
	const value = parts[0];
	const unit = parts[parts.length - 1];
	if (cssUnits.indexOf(unit) !== -1) {
	  result = new sassUtils.SassDimension(parseInt(value, 10), unit);
	}
 
	return result;
 };

module.exports = {
	entry: [
		'babel-polyfill',
		'webpack-dev-server/client',
		'./engine/index.js',
	],

	devServer: {
		host: '192.168.1.33',
		port: 8193,
		historyApiFallback: true,
		contentBase: './',
	},

	output: {
		path: path.resolve(__dirname, '/'),
		publicPath: '/',
		filename: '[name].js',
	},

	mode: 'development',
	devtool: 'cheap-module-eval-source-map',

	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					name: 'commons',
					chunks: 'initial',
					minChunks: 3,
					enforce: true,
				},
			},
		},
	},

	resolve: {
		alias: {
			react: path.resolve(__dirname, './node_modules/react'),
			React: path.resolve(__dirname, './node_modules/react'),
			libs: path.resolve(__dirname, '../server/libs'),
		},
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: /(node_modules|bower_components)/,
			},
			{
				test: /\.(scss|css)$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'sass-loader',
						options: {
							functions: {
								'get($keys)': function(keys) {
									keys = keys.getValue().split('.');
									var result = sassVars;
									var i;
									for (i = 0; i < keys.length; i++) {
									  result = result[keys[i]];
									  // Convert to SassDimension if dimenssion
									  if (typeof result === 'string') {
										 result = convertStringToSassDimension(result);
									  } else if (typeof result === 'object') {
										 Object.keys(result).forEach(function(key) {
											var value = result[key];
											result[key] = convertStringToSassDimension(value);
										 });
									  }
									}
									result = sassUtils.castToSass(result);
									return result;
								}							
							},
						},
					},
				],
			},
			{
				test: /\.svg$/,
				use: [
					{
						loader: 'file-loader',
					},
					{
						loader: 'svgo-loader',
						options: {
							plugins: [
								{
									removeTitle: true
								},
								{
									convertColors: {
										shortHex: false,
									},
								},
								{
									convertPathData: false,
								},
							],
						}
					},
				],
			},
		],
	},

	plugins: [
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoEmitOnErrorsPlugin(),
	new webpack.LoaderOptionsPlugin({
		debug: true,
		minimize: false,
	}),
	new HTMLWebpackPlugin({
		template: 'index.html',
		inject: true,
	}),
	],
};
