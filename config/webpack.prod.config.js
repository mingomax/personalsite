/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const common = require('./webpack.common');
const envConfig = require('./shared.config');
const templateConfig = require('./pages.config');

module.exports = merge(common, {
  mode: 'production',
  target: 'browserslist',
  /* Manage source maps generation process. Refer to https://webpack.js.org/configuration/devtool/#production */
  devtool: false,
  output: {
    path: path.resolve(__dirname, envConfig.paths.build),
    filename: 'assets/js/[name].[chunkhash].bundle.js',
    clean: true,
  },
  /* Optimization configuration */
  optimization: {
    minimize: true,
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            // Lossless optimization with custom option
            // Feel free to experiment with options for better result for you
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 5 }],
              // Svgo configuration here https://github.com/svg/svgo#configuration
              [
                'svgo',
                {
                  plugins: [
                    {
                      name: 'removeViewBox',
                      active: false,
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
      new CssMinimizerPlugin(),
      new TerserPlugin({
        parallel: true,
        test: /\.js(\?.*)?$/i,
      }),
      new HtmlWebpackPlugin({
        inject: 'body',
        template: path.resolve(__dirname, '../src/template.html'),
        favicon: `${envConfig.paths.source}/assets/midias/images/favicons/favicon.ico`,
        minify: {
          html5: true,
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true,
        },
        beforeAssetTagGeneration: {
          outputName: 'assets/images/[name].[hash:6][ext]',
        },
      }),
    ],
    runtimeChunk: {
      name: 'runtime',
    },
  },

  /* Performance treshold configuration values */
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  module: {
    rules: [
      {
        test: /\.((c|sa|sc)ss)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: false,
              modules: false,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  /* Additional plugins configuration */
  plugins: [
    new webpack.ProgressPlugin(),
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
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[chunkhash].css',
      chunkFilename: '[id].css',
    }),
    ...templateConfig.plugins,
  ],
});
