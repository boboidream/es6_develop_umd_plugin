var webpack = require('webpack')
var path = require('path')
var libraryName = 'ES6Base'
var outputFile = libraryName + '.js'
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

var config = {
  entry: {
    [libraryName]: __dirname + '/src/index.js',
    style: __dirname + '/src/style.js'
  },
  devtool: 'cheap-module-source-map',
  output: {
    path: __dirname + '/demo',
    filename: "[name]" + '.js',
    library: libraryName,
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
      },
      {
        test: /\.(jep?g|png|git|svg)$/i,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: './images/[name].[ext]'
        }
      }
    ]
  },
  externals: {
    'jquery': {
      amd: 'jquery',
      root: '$',
      commonjs: 'jquery',
      commonjs2: 'jquery'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: libraryName + ' Demo',
      filename: '../demo/index.html',
      template: __dirname + '/src/index.ejs'
    })
  ],
  devServer: {
    contentBase: [path.join(__dirname, "demo"), path.join(__dirname, "/")],
    watchContentBase: true,
    publicPath: "/lib/",
    compress: true,
    port: 9000
  }
}


module.exports = function(env) {
  // 配置生产环境
  if (env && (env.product || env.minify)) {
    config.output.path = __dirname + '/lib'
    config.devtool = ''
  }

  // 压缩
  if (env && env.minify) {
    config.output.filename = "[name]" + '.min.js'
    config.plugins.push(new ExtractTextPlugin('style.min.css'))
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({}))
    config.plugins.push(new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/,
      cssProcessorOptions: { discardComments: { removeAll: true } }
    }))
  } else {
    config.plugins.push(new ExtractTextPlugin('style.css'))
  }

  return config
}
