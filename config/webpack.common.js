const path = require('path');

const envConfig = require('./shared.config');
const isDevelopment = process.env.NODE_ENV !== 'production';

const assetFileName = () => {
  let assetPath = '[path][name].[contenthash].[ext]';
  if (isDevelopment) {
    assetPath = '[path][name].[ext]';
  }

  return `assets/images/${assetPath}`;
};

module.exports = {
  entry: [
    path.resolve(envConfig.paths.source, 'assets/js', 'global.js'),
    path.resolve(envConfig.paths.source, 'assets/scss', 'styles.scss'),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: isDevelopment },
          },
          {
            loader: 'posthtml-loader',
            options: {
              plugins: [
                require('posthtml-include')({
                  root: envConfig.paths.source,
                }),
              ],
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        mimetype: 'text/javascript',
        use: ['babel-loader'],
      },
      {
        test: /\.(?:ico|png|gif|jp(e)?g|svg|json)$/i,
        type: 'asset/resource',
        parser: {
          dataUrlCondition: {
            maxSize: envConfig.limits.images,
          },
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
        type: 'asset/inline',
        parser: {
          dataUrlCondition: {
            maxSize: envConfig.limits.fonts,
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, envConfig.paths.source),
      assets: path.resolve(__dirname, envConfig.paths.public),
    },
    modules: ['node_modules', envConfig.paths.source],
    extensions: ['.js', '.scss', '.html', '.json'],
  },
};
