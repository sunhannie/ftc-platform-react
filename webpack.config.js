var webpack = require('webpack');
var path = require('path');
// var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    mode: "production", 
    devtool: 'cheap-module-eval-source-map',
    // entry:
    // {
    //     'index':path.join(__dirname, 'index.js')
    //     // 'user':['./client/scripts/base.js','./client/scripts/user.js'],
    // },
   
    entry: [
    // 'webpack-hot-middleware/client',
      './client/index.js'
    ],
    output: {
        path: path.join(__dirname, 'tmp/'),  //这儿好像没起作用
        filename: '[name].js', //输出文件名，[name].js默认是main.js。如果指定则是指定名
        publicPath: 'tmp/',
        chunkFilename: "[chunkhash].js"
    },
    module: {
        rules:[
             {

                test: /\.js|\.jsx$/,
                include: [
                    path.join(__dirname, "client","scripts")
                ],
                // exclude: [
                //     path.resolve(__dirname, "node_modules")
                // ],
                loader: "babel-loader",
                options: {
                    presets: ["es2015"]
                },
             },
             {
                test: /\.css$/,
                loader: "style!css"
             },
             {
                test: /\.json?$/,
                loader: 'json'
             },
             {
                test: /\.scss$/,
                include: [
                    path.join(__dirname, "client","styles")
                ],
                loader: 'style-loader!css-loader!sass-loader?sourceMap=true&sourceMapContents=true'
             },
             {
                test: /\.html$/,
                use: [
                    "htmllint-loader",
                    {
                        loader: "html-loader",
                        options: {
                        }
                    }
                ]
            }
        ]      
    },
     resolve: {
        alias: {
      //Create aliases to import or require certain modules more easily. Eg: in app.js, "import React from '../node_modules/react';" can now be written as "import React from 'react"
            'react': path.join(__dirname,'node_modules','react')
        },
        extensions: [".js", ".json", ".jsx", ".css"],
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //   template: './index.tpl.html',
        //   inject: 'body',
        //   filename: './index.html'
        // }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        // new webpack.DefinePlugin({
        //    'VERSION': JSON.stringify("5fa3b9"),
        //    'NICE_FEATURE': JSON.stringify(true),
        // })

    ],
    // watch: true
    
};
