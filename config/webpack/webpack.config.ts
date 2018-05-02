import path from "path";
import { entryFile, environment, rootPathFunc } from "../config";

export default () => {
  return {
    entry: rootPathFunc(`src/ts/${entryFile}`),
    output: {
      filename: "index.js",
      path: rootPathFunc(`www/js`)
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"]
    }
  };
};
