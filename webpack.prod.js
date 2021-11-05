require("dotenv").config();
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizer = require("css-minimizer-webpack-plugin");
const Terser = require("terser-webpack-plugin");
const { EnvironmentPlugin } = require("webpack");

module.exports = {
  mode: "production",

  output: {
    clean: true,

    filename: "main.[contenthash].js",
  },
  module: {
    rules: [
      {
        test: /\.script\.js$/,
        use: {
          loader: "script-loader",
          options: {
            useStrict: true,
            minimize: false,
          },
        },
      },
      {
        test: /\.html$/,
        loader: "html-loader",
        options: {
          sources: false,
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizer(), new Terser()],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Pollutiolevel",
      template: "./src/index.html",
    }),
    new CopyPlugin({
      patterns: [{ from: "src/css", to: "css/" }],
    }),
    new CopyPlugin({
      patterns: [{ from: "src/immagini", to: "immagini/" }],
    }),

    new EnvironmentPlugin({
      TOKEN: process.env.TOKEN,
    }),
  ],
};
