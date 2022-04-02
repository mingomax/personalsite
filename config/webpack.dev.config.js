/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const common = require('./webpack.common');
const envConfig = require('./shared.config');
const templateConfig = require('./pages.config');
const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = merge(common, {
  mode: 'development',
  target: 'web',
  /* Manage source maps generation process */
  devtool: 'inline-source-map',
  output: {
    filename: '[name].[chunkhash].bundle.js',
    path: envConfig.paths.build,
    clean: true,
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true,
    static: {
      watch: true,
      serveIndex: true,
    },
    compress: true,
    // Enable hot reloading
    hot: true,
    liveReload: true,
    watchFiles: {
      paths: ['src/**/*.scss', 'src/**/*.js', 'src/**/*.html'],
      options: {
        usePolling: true,
      },
    },
  },
  /* File watcher options */
  watchOptions: {
    aggregateTimeout: 300,
    poll: 300,
    ignored: /node_modules/,
  },
  module: {
    rules: [
      {
        test: /\.((c|sa|sc)ss)$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
              modules: false,
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  /* Additional plugins configuration */
  plugins: [
    new webpack.DefinePlugin({
      IS_DEV: isDevelopment,
    }),
    new webpack.ProgressPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin({
      verbose: true,
      cleanOnceBeforeBuildPatterns: ['**/*', '!stats.json'],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(envConfig.paths.source, 'assets/midias'),
          to: path.resolve(envConfig.paths.build, 'assets', 'midias'),
          toType: 'dir',
          globOptions: {
            ignore: ['*.DS_Store', 'Thumbs.db'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: path.resolve(__dirname, '../src/template.html'),
      favicon: `${envConfig.paths.source}/assets/midias/images/favicons/favicon.ico`,
      filename: 'index.html',
    }),
    ...templateConfig.plugins,
  ],
});
