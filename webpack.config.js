const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const isDevelopment = process.env.NODE_ENV !== "production";

const webpackConfig = {
  devtool: "source-map",
  mode: "development",
  target: "web",
  context: path.resolve(__dirname, "../src"),
  entry: ["./assets/js/global.js", "./assets/scss/styles.scss"],
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "assets/js/[name].[fullhash].bundle.js",
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: "vendor",
          test: /node_modules/,
          chunks: "all",
          enforce: true,
        },
      },
    },
  },
  devtool: isDevelopment ? "eval-cheap-module-source-map" : "source-map",
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "dist/assets",
            },
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: isDevelopment,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: isDevelopment,
            },
          },
          { loader: "resolve-url-loader" },
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDevelopment,
              sassOptions: {
                includePaths: [path.join(__dirname, "./assets/scss")],
              },
            },
          },
        ],
        exclude: "/node_modules",
      },
      {
        test: /\.(html)$/,
        use: {
          loader: "html-loader",
        },
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: "/node_modules/",
        options: {
          cacheDirectory: true,
          presets: [["@babel/preset-env", { targets: "defaults" }]],
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        type: "asset/inline",
      },
      {
        test: /\.(png|jpg|gif|xml|svg|webmanifest)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      IS_DEV: isDevelopment,
    }),
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin({
      dry: true,
      verbose: true,
      cleanOnceBeforeBuildPatterns: ["**/*"],
      cleanAfterEveryBuildPatterns: ["dist"],
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment
        ? "assets/css/[name].css"
        : "assets/css/[name].[contenthash].css",
      chunkFilename: isDevelopment
        ? "assets/css/[id].css"
        : "assets/css/[id].[contenthash].css",
      linkType: "text/css",
    }),
    new HtmlWebpackPlugin({
      inject: "body",
      template: "./index.html",
      filename: "./index.html",
      minify: !isDevelopment && {
        html5: true,
        collapseWhitespace: true,
        caseSensitive: true,
        removeComments: true,
        removeEmptyElements: true,
      },
    }),
    new CopyPlugin({
      patterns: [
        { from: "./assets/fonts", to: "../dist/assets/fonts" },
        // { from: "./assets/midias/images", to: "../dist/assets/images" },
      ],
      options: {
        concurrency: 100,
      },
    }),
    new BrowserSyncPlugin({
      host: "localhost",
      port: 3000,
      server: { baseDir: ["dist"] },
    }),
  ],
  resolveLoader: {
    modules: [path.join(__dirname, "../node_modules")],
  },
  resolve: {
    extensions: ["*", ".js", ".scss"],
    modules: [path.join(__dirname, "../node_modules")],
  },
  stats: {
    colors: true,
    children: false,
  },
};

module.exports = webpackConfig;
