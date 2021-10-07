import path from 'path';
import { VueLoaderPlugin } from 'vue-loader';

export default {
    mode: 'development',
    devtool: false,
    entry: ['./src/client.js'],
    output: {
        filename: 'main.js',
        path: path.resolve('./dist/js'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-transform-runtime',
                        ],
                    }
                },
            },
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                use: {
                    loader: 'vue-loader',
                },
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
};