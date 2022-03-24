/* eslint-disable import/no-extraneous-dependencies */
const path = require("path");
const { merge } = require("webpack-merge");
var HtmlWebpackPlugin = require("html-webpack-plugin");

const common = require("./webpack.common");
const envConfig = require("./shared.config");
const templateConfig = require("./pages.config");

module.exports = merge(common, {
  mode: "development",
  target: "web",
  /* Manage source maps generation process */
  devtool: "eval-cheap-source-map",
  output: {
    filename: "[name].[chunkhash].bundle.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/dist",
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: envConfig.paths.output,
      watch: true,
      serveIndex: true,
    },
    // Enable hot reloading
    hot: true,
    liveReload: true,
    watchFiles: {
      paths: ["src/**/*.scss", "src/**/*.js", "src/**/*.html"],
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
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  /* Additional plugins configuration */
  plugins: [
    new HtmlWebpackPlugin({
      inject: "body",
      template: path.resolve(__dirname, "../src/index.html"),
      favicon: path.resolve(
        envConfig.paths.source,
        "assets/midias/images/favicons",
        "favicon.ico"
      ),
      meta: {
        viewport: "width=device-width, initial-scale=1.0",
        "theme-color": "#164a41",
      },
    }),
    ...templateConfig.plugins,
  ],
});
