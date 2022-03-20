/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require("webpack-merge");

const webpackConfiguration = require("../webpack.config");
const envConfig = require("./shared.config");
const templateConfig = require("./pages.config");

module.exports = merge(webpackConfiguration, {
  mode: "development",

  /* Manage source maps generation process */
  devtool: "eval-source-map",

  /* Development Server Configuration */
  devServer: {
    liveReload: true,
    watchFiles: {
      paths: ["src/**/*.scss", "src/**/*.js", "src/**/*.html"],
      options: {
        usePolling: false,
      },
    },
    static: {
      directory: envConfig.paths.output,
      publicPath: "/dist",
      watch: true,
    },
    client: {
      overlay: true,
    },
    open: true,
    compress: true,
    hot: true,
    ...envConfig.server,
  },

  /* File watcher options */
  watchOptions: {
    aggregateTimeout: 300,
    poll: 300,
    ignored: /node_modules/,
  },

  /* Additional plugins configuration */
  plugins: [...templateConfig.plugins],
});
