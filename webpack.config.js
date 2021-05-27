const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'production',
    entry: {
        index: './src/js/index.js',
        home: './src/js/home.js'
    },
    output: {
        filename: '[name].[hash].bundle.js',
        path: path.resolve(__dirname,"assets"),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                        }
                    },
                    'css-loader',
                ],
            },   
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images',
                            name: '[name].[hash].[ext]'
                        }
                    }
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, '/'),
        port: 8888,
        hot: true,
        open: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: './src/index.html',
            inject: 'body',
            chunks: ['index'],
            showErrors: true
        }),
        new HtmlWebpackPlugin({
            filename: '../home.html',
            template: './src/home.html',
            inject: 'body',
            chunks: ['home'],
            showErrors: true 
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].min.css',
        }),
        new webpack.HotModuleReplacementPlugin(),

    ],
};
