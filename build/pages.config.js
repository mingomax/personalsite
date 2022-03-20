/* eslint-disable import/no-extraneous-dependencies */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPartialsPlugin = require("html-webpack-partials-plugin");
const envConfig = require("./shared.config");

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      inject: "body",
      template: path.join(__dirname, "../src/index.html"),
    }),
    new HtmlWebpackPlugin({
      filename: "home.html",
      template: path.join(__dirname, "../src/index.html"),
    }),
    new HtmlWebpackPlugin({
      filename: "styleguide.html",
      template: path.join(__dirname, "../src/index.html"),
    }),
    new HtmlWebpackPartialsPlugin([
      {
        path: path.join(__dirname, "../src/partials/header.html"),
        template_filename: "*",
      },
      {
        path: path.join(__dirname, "../src/pages/home.html"),
      },
      {
        path: path.join(__dirname, "../src/pages/styleguide.html"),
        template_filename: "styleguide.html",
      },
    ]),
  ],
};
