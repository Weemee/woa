const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        'babel-polyfill',
        'webpack-dev-server/client',
        './source/index.js',
    ],

    target: 'web',
    devServer: {
            historyApiFallback: true,
            contentBase: './',
    },

    output: {
        path: path.resolve(__dirname, '/'),
        publicPath: '/',
        filename: '[name].js',
    },

    optimization: {
        minimize: false,
        runtimeChunk: {
            name: 'vendor'
        },
        splitChunks: {
            cacheGroups: {
                default: false,
                commons: {
                    test: /node_modules/,
                    name: "vendor",
                    chunks: "initial",
                    minSize: 1
                }
            }
        }
    },

    devtool: '#inline-source-map',

    resolve: {
        alias: {
            react: path.resolve(__dirname, './node_modules/react'),
            React: path.resolve(__dirname, './node_modules/react'),
            vars: path.resolve(__dirname, '../server/vars'),
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
        ],
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
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
