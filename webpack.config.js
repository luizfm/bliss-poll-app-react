const webpack = require('webpack')
const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Dotenv = require('dotenv-webpack')

const isDevelopment = process.env.NODE_ENV !== 'production'

const miniCssPlugin = new MiniCssExtractPlugin()
const dotenv = new Dotenv()

const htmlPlugin = new HtmlWebPackPlugin({
  template: '/public/index.html',
  filename: './index.html',
})

const environmentPlugin = new webpack.DefinePlugin({
  'process.env': {
    API_URL: JSON.stringify(process.env.API_URL)
  }
})

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    historyApiFallback: true,
    compress: true,
    port: 3000,
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // localIdentName is needed to be able to work with styles.css files
              modules: { localIdentName: '[local]' },
              sourceMap: true,
              importLoaders: 1,
            },
          },
          'sass-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      _components: path.resolve(__dirname, 'src/components'),
      _assets: path.resolve(__dirname, 'src/assets'),
      _views: path.resolve(__dirname, 'src/views'),
      _routes: path.resolve(__dirname, 'src/routes'),
      _utils: path.resolve(__dirname, 'src/utils'),
      _hooks: path.resolve(__dirname, 'src/hooks'),
      _services: path.resolve(__dirname, 'src/services'),
      _modules: path.resolve(__dirname, 'src/modules'),
      _store: path.resolve(__dirname, 'src/store'),
    },
  },
  plugins: [htmlPlugin, miniCssPlugin, ...(isDevelopment ? [dotenv] : [environmentPlugin])],
}
