import { CheckerPlugin } from "awesome-typescript-loader";
import HardLink from "hard-source-webpack-plugin";
import { join, resolve } from "path";
import nodeExternals from "webpack-node-externals";
import { webpackMode } from "./config/config";

export default {
  entry: "./src/GraphQLApp.ts",
  target: "node",
  context: __dirname,
  output: {
    filename: "app.js",
    path: join(__dirname, "./dist")
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
  externals: [nodeExternals({ modulesDir: resolve(__dirname, "../../node_modules") })],
  node: {
    __dirname: true
  },
  plugins: [new HardLink(), new CheckerPlugin()]
}