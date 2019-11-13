import path from 'path';
import webpack from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import 'webpack-dev-server';

const config:webpack.Configuration = {
    mode: "development",
    entry: './client/src/index.tsx',
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Output Management',
            template: './client/template/index.html'
        }),
    ],
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, "./client/public/"),
        compress: true,
        port: 3000,
        // https: true,
        // proxy: {
        //     '/portal': 'http://localhost/8080/',
        // },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                },
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, "./client/public/"),
    },
};

export default config;