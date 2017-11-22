let path = require('path');
let webpack = require('webpack');
let CopyWebpackPlugin = require('copy-webpack-plugin');

let baseName = 'dist/converter';

module.exports = {
    entry: {
        app: path.join(__dirname, 'src/entry.jsx'),
    },
    output: {
        path: path.join(__dirname, baseName),
        filename: '[name].js',
        chunkFilename: '[id].[chunkhash].chunk.js',
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new CopyWebpackPlugin([{
            from: 'public'
        }])
    ],
    resolve: {
        root: [
            __dirname,
        ],
        extensions: ['', '.jsx', '.js', '.styl', '.json'],
    },
    module: {
        loaders: [{
                test: /\.jsx$/,
                loader: 'babel',
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                loader: 'style!css',
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                loader: 'url?limit=10000&name=images/[path][name].[hash].[ext]',
            },
            {
                test: /\.(json)$/,
                loader: 'json',
            },
        ],
    },
}