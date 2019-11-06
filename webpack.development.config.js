const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './client/src/index.ts',
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Output Management',
            template: './client/public/index.html'
        }),
    ],
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, "./client/build"),
        compress: true,
        port: 3000,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            // {
            //     test: /\.(html)$/,
            //     use: {
            //         loader: 'html-loader',
            //     },
            // },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname,"./client/build/"),
    },
};