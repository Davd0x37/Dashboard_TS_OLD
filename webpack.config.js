const path = require("path")
var fs = require("fs")
const BitBarWebpackProgressPlugin = require("bitbar-webpack-progress-plugin")

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
  entry: "./app/app.ts",
  target: "node",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.js"
  },
  resolve: {
    extensions: [".ts", ".js", ".gql"]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: "ts-loader"
        }
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: "raw-loader"
      }
    ]
  },
  watchOptions: {
    poll: true
  },
  externals: nodeModules,
  plugins: [new BitBarWebpackProgressPlugin()]
}
