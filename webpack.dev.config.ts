import path from 'path';
import webpack from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import {} from 'html-webpack-plugin';

const config:webpack.Configuration = {
    mode: "development",
    entry: './client/src/index.tsx',
    plugins: [

    ],
};