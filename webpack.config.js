require("dotenv").config();

const HtmlWebpack = require("html-webpack-plugin");
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { EnvironmentPlugin } = require("webpack");

module.exports = {
  mode: "development",

  output: {
    clean: true,
  },

  devServer: {
    port: 8080,
    open: true,
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
        exclude: /styles.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /styles.css$/,
        use: [MiniCssExtract.loader, "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: "file-loader",
      },
    ],
  },

  optimization: {},

  plugins: [
    new HtmlWebpack({
      title: "Pollutionlevel",

      template: "./src/index.html",
    }),

    new MiniCssExtract({
      filename: "[name].css",
      ignoreOrder: false,
    }),

    new CopyPlugin({
      patterns: [{ from: "src/css/", to: "css/" }],
    }),
    new CopyPlugin({
      patterns: [{ from: "src/immagini/", to: "immagini/" }],
    }),

    new EnvironmentPlugin({
      TOKEN: process.env.TOKEN,
    }),
  ],
};
