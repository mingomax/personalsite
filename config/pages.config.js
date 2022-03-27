/* eslint-disable import/no-extraneous-dependencies */
const path = require("path");
const HtmlWebpackPartialsPlugin = require("html-webpack-partials-plugin");

module.exports = {
  plugins: [
    new HtmlWebpackPartialsPlugin([
      {
        path: path.join(__dirname, "../src/partials/header.html"),
        template_filename: "*",
      },
      {
        path: path.join(__dirname, "../src/pages/home.html"),
        template: "index.html",
      },
      {
        path: path.join(__dirname, "../src/pages/styleguide.html"),
        template_filename: "styleguide.html",
      },
    ]),
  ],
};
