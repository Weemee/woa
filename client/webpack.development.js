const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: [
	'babel-polyfill',
	'webpack-dev-server/client',
	'./engine/index.js',
	],

	devServer: {
		port: 8193,
		historyApiFallback: true,
		contentBase: './',
		hot: true,
	},

	output: {
		path: path.resolve(__dirname, '/'),
		publicPath: '/',
		filename: '[name].js',
	},

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

	mode: 'development',

	devtool: 'inline-source-map',

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
			loader: 'style-loader!css-loader?sourceMap!sass-loader?sourceMap',
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
