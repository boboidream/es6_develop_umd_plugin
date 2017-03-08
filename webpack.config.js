var webpack = require('webpack')
var path = require('path')
var libraryName = 'ES6Base'
var outputFile = libraryName + '.js'
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

var config = {
  // entry: [__dirname + '/src/index.js', __dirname + '/src/style.less'],
  entry: {
    [libraryName]: __dirname + '/src/index.js',
    style: __dirname + '/src/style.js'
  },
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: "[name]" + '.js',
    library: 'Lux',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'less-loader']
        })
      }
    ]
  },
  externals: {
    'jquery': '$'
  },
  plugins: [
    new ExtractTextPlugin("style.css"),
    new HtmlWebpackPlugin({
      title: libraryName + ' Demo',
      filename: '../demo/index.html',
      template: __dirname + '/src/index.ejs',
      vendor: '/node_modules/'
    })
  ],
  devServer: {
    contentBase: [path.join(__dirname, "demo")],
    watchContentBase: true,
    publicPath: "/lib/",
    compress: true,
    port: 9000
  }
}

module.exports = config
