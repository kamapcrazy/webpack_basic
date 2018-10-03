var webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const {
    AngularCompilerPlugin
} = require('@ngtools/webpack');

const helpers = require('./helpers');

module.exports = {
    target: "web",
    entry: {
        main: helpers.root('src', 'main.ts'),
        polyfills: helpers.root('src', 'polyfills.ts')
    },
    output: {
        path: helpers.root("dist"),
        publicPath: "/",
        filename: "[name].js"
    },
    resolve: {
        extensions: [".js", ".ts", ".html"]
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: "@ngtools/webpack"
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin([{
            from: helpers.root('src', 'assets'),
            to: 'assets'
        }]),
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new AngularCompilerPlugin({
            tsConfigPath: helpers.root('tsconfig.json'),
            entryModule: helpers.root('src', 'app', 'app.module#AppModule'),
            sourceMap: true
        })
    ]
}