const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './client/src/index.ts',
    plugins: [
        new CleanWebpackPlugin(),
    ],
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './client/build/',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: './client/build/',
    },
};