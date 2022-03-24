const path = require("path");

const envConfig = require("./shared.config");
const isDevelopment = process.env.NODE_ENV !== "production";

const assetFileName = () => {
  let assetPath = "[path][name].[contenthash].[ext]";
  if (isDevelopment) {
    assetPath = "[path][name].[ext]";
  }

  return `assets/images/${assetPath}`;
};

module.exports = {
  entry: [
    path.resolve(envConfig.paths.source, "assets/js", "global.js"),
    path.resolve(envConfig.paths.source, "assets/scss", "styles.scss"),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(png|gif|jpe?g|svg|json)$/i,
        type: "asset/resource",
        parser: {
          dataUrlCondition: {
            maxSize: envConfig.limits.images,
          },
        },
        generator: {
          filename: assetFileName(),
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg)$/,
        type: "asset/resource",
        parser: {
          dataUrlCondition: {
            maxSize: envConfig.limits.images,
          },
        },
        generator: {
          filename: "assets/fonts/[name].[hash:6].[ext]",
        },
      },
    ],
  },
};
