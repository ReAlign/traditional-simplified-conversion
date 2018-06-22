const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const extractCss = new ExtractTextWebpackPlugin("app.css");

const baseName = 'dist/converter';

module.exports = {
    entry: {
        app: path.join(__dirname, 'src/entry.jsx'),
    },
    output: {
        path: path.join(__dirname, baseName),
        filename: '[name].js',
        chunkFilename: '[id].[chunkhash].chunk.js',
    },
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
                loader: extractCss.extract(['css', 'sass'])},
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
    sassLoader:{
        includePaths:[path.resolve(__dirname, './src')]
    },
    plugins: [
        extractCss,
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new CopyWebpackPlugin([{
            from: 'public'
        }])
    ],
    watchOptions:{
        poll: 1000,
        aggregeateTimeout: 500,
        ignored: /node_modules/
    }
}