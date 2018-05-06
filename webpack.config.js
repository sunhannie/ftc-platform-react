var webpack = require('webpack');
var path = require('path');
// var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    mode: "production", 
    devtool: 'cheap-module-eval-source-map',
    entry:
    {
        // 'index':path.join(__dirname, 'client/index.js')
        // 'index':['webpack-hot-middleware/client?noInfo=true&reload=true','./client/index.js'],
        'index':['./client/index.js']
    },
   
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
                    path.join(__dirname, 'client'),
                    // path.join(__dirname, "client","scripts")
                ],
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
                loader: "babel-loader",
                options: {
                    presets: ['react','es2015']
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
     performance: {
        hints:  false, // enum
        maxAssetSize: 200000, // int (in bytes),
        maxEntrypointSize: 400000, // int (in bytes)
    },


      // devServer: {
      //   proxy: { // proxy URLs to backend development server
      //     '/api': 'http://localhost:3000'
      //   },
      //   contentBase: path.join(__dirname, 'public'), // boolean | string | array, static file location
      //   compress: true, // enable gzip compression
      //   historyApiFallback: true, // true for index.html upon 404, object for multiple paths
      //   hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
      //   https: false, // true for self-signed, object for cert authority
      //   noInfo: true, // only errors & warns on hot reload
      // },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    watch: true //这意味着在初始构建之后，webpack将继续监视任何已解析文件的更改。手表模式默认关闭
    
};
