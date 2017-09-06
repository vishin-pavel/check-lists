const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: {
    app: './frontend-src/index.js'
  },
  plugins: [
      new webpack.ProvidePlugin({
          _: "lodash",
          $: "jquery",
          jQuery: "jquery"
      }),
    new CleanWebpackPlugin(['public']),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'frontend-src/templates/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './public',
    hot: true
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  resolve: {
    alias: {
      'underscore': 'lodash'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: {presets: ['es2015']}
          }
        ]
      },
        {
            test: /\.(scss|css)$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader', options: {
                    sourceMap: true,
                }
            }, {
                loader: 'sass-loader',
                options: {
                    sourceMap: true,
                }
            }]
        },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
}
