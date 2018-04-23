const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        'babel-polyfill',
        './engine/index.js',
    ],

    output: {
        path: path.resolve(__dirname, 'distribution'),
		publicPath: '',
        filename: '[name].js',
    },

    resolve: {
        alias: {
            react: path.resolve(__dirname, './node_modules/react'),
            React: path.resolve(__dirname, './node_modules/react'),
            libs: path.resolve(__dirname, '../server/libs'),
        },
    },
    performance: { hints: false },

    devtool: 'cheap-module-source-map',

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(scss|css)$/,
                loader: 'style-loader!css-loader?sourceMap!sass-loader?sourceMap',
            },
        ],
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: false,
            minimize: true,
        }),
        new HTMLWebpackPlugin({
                template: 'index.html',
                inject: true,
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
    ],
};
