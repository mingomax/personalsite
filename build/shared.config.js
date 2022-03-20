/* eslint-disable import/no-extraneous-dependencies */
const path = require("path");
const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  paths: {
    /* Path to source files directory */
    source: path.resolve(__dirname, "../src/"),
    /* Path to built files directory */
    output: path.resolve(__dirname, "../dist/"),
  },
  server: {
    host: "0.0.0.0",
    port: 8000,
  },
  limits: {
    /* Image files size in bytes. Below this value the image file will be served as DataURL (inline base64). */
    images: 8192,
    /* Font files size in bytes. Below this value the font file will be served as DataURL (inline base64). */
    fonts: 8192,
  },
};
