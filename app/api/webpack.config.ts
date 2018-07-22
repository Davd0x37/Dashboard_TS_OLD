import { CheckerPlugin } from "awesome-typescript-loader";
import { join, resolve } from "path";
import { webpackMode } from "./src/config/config";

import HardLink from "hard-source-webpack-plugin";
import nodeExternals from "webpack-node-externals";

// Workaround
// // HardLink has no default constructor (TypeScript words)
// const HardLink = require("hard-source-webpack-plugin");
// // Same here
// const nodeExternals = require("webpack-node-externals");

export default {
  entry: "./src/GraphQLApp.ts",
  target: "node",
  context: __dirname,
  output: {
    filename: "app.js",
    path: join(__dirname, "./dist"),
    pathinfo: false
  },
  mode: webpackMode,
  // devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".gql", ".mjs", ".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "awesome-typescript-loader"
      },
      {
        test: /\.(gql|graphql)$/,
        use: "raw-loader"
      }
    ]
  },
  externals: [
    nodeExternals({ modulesDir: resolve(__dirname, "../../node_modules") })
  ],
  node: {
    __dirname: true
  },
  plugins: [new HardLink(), new CheckerPlugin()]
};
