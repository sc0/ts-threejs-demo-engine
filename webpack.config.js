const webpack = require("webpack");
const path = require("path");

module.exports = {
  mode: "development",

  entry: {
    main: "./src/App.ts",
  },

  output: {
    path: __dirname + "/web/",
    filename: "js/[name].js"
  },

  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        loader: "ts-loader"
      }
    ]
  },

  devServer: {
    host: "0.0.0.0",
    port: 8000,
    disableHostCheck: true,
    contentBase: path.join(__dirname, 'web')
  }

}
