const path = require("path")
var fs = require("fs")

var nodeModules = {}
fs
  .readdirSync("node_modules")
  .filter(function(x) {
    return [".bin"].indexOf(x) === -1
  })
  .forEach(function(mod) {
    nodeModules[mod] = "commonjs " + mod
  })

module.exports = {
  entry: "./app/server.ts",
  target: "node",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.js",
  },
  resolve: {
    extensions: [".ts", ".js", ".gql"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "ts-loader",
          // options: {
          //   presets: ['babel-preset-env']
          // }
        },
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: "raw-loader",
      },
    ],
  },
  externals: nodeModules,
}
