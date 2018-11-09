const { resolve } = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const HappyPack = require("happypack");
const ForkTS = require("fork-ts-checker-webpack-plugin");
const HardSource = require("hard-source-webpack-plugin")

module.exports = {
  mode: "production",
  entry: {
    app: ["./app/App.ts"]
  },
  target: "node",
  context: __dirname,
  // watch: true,
  output: {
    path: resolve(__dirname, "dist"),
    filename: "bundle.[name].js",
    // library: "[name]_[hash]",
    pathinfo: false
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [resolve(__dirname, "app"), resolve(__dirname, "../Shared")],
        exclude: /node_modules/,
        loader: "happypack/loader?id=ts"
      },
      {
        test: /\.(gql|graphql)$/,
        include: resolve(__dirname, "app"),
        exclude: /node_modules/,
        use: "raw-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    plugins: [new TsconfigPathsPlugin({ configFile: resolve(__dirname, "tsconfig.json") })]
  },
  plugins: [
    new HappyPack({
      id: "ts",
      threads: 2,
      loaders: [
        {
          path: "ts-loader",
          query: {
            happyPackMode: true
          }
        }
      ]
    }),
    new ForkTS({ checkSyntacticErrors: true }),
    new webpack.DllPlugin({
      path: resolve(__dirname, "dist", "[name]-manifest.json"),
      name: "[name]_[hash]"
    }),
    new HardSource()
  ],
  externals: [nodeExternals()]
};
