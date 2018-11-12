import { writeFileSync } from "fs";
import { resolve } from "path";
import { fileExistsSync } from "tsconfig-paths/lib/filesystem";
import webpack, { Compiler, Stats } from "webpack";
import { IWebpackConfigFile } from "./Interfaces";
import webpackConfig from "./webpack.config";
import WebpackConfigNode from "./webpack.node";

const importConfigFile = async (
  config: string = "triton.config.js"
): Promise<{ readonly default: IWebpackConfigFile }> => {
  const path = resolve(process.cwd(), config);
  return fileExistsSync(path) ? import(path) : { default: { output: {} } };
};

const logHandler = (type: Readonly<string>) => (_: Error, stats: Stats) => {
  const path = resolve(
    __dirname,
    "../",
    `logs/${type}-${new Date()
      .toISOString()
      .replace(":", "-")
      .replace(":", "-")}.txt`
  );
  return writeFileSync(path, stats, { encoding: "utf-8" });
};

const setMode = (env: any) => (res: {
  readonly default: IWebpackConfigFile;
}) => ({
  ...res.default,
  ...(env.dev && { mode: "development" as "development" })
});

const selectWebpackConfig = (env: any) => (res: IWebpackConfigFile) =>
  env.target === "node"
    ? WebpackConfigNode({ output: {} })
    : webpackConfig(res);

const runWebpack = (env: any) => (compiler: Compiler) =>
  env.dev
    ? compiler.watch({}, logHandler("watch"))
    : compiler.run(logHandler("run"));

export default (env: any) =>
  importConfigFile(env.config)
    .then(setMode(env))
    .then(selectWebpackConfig(env))
    .then(config => webpack(config))
    .then(runWebpack(env));
