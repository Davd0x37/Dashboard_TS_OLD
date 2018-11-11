import { writeFileSync } from "fs";
import { resolve } from "path";
import { fileExistsSync } from "tsconfig-paths/lib/filesystem";
import webpack, { Stats } from "webpack";
import { IWebpackConfigFile } from "./Interfaces";
import webpackConfig from "./webpack.config";
import WebpackConfigNode from "./webpack.node";

const data = {
  configFile: "triton.config.js"
};

const configFile = async (
  config: string = data.configFile
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

export default async (env: any) => {
  const file = await configFile(env.config);
  const mergedConfig: IWebpackConfigFile = {
    ...file.default,
    ...(env.dev && { mode: "development" })
  };
  const config =
    env.target === "node"
      ? webpackConfig(mergedConfig)
      : WebpackConfigNode({ output: {} });
  const compiler = webpack(config);
  return env.dev
    ? compiler.watch({}, logHandler("watch"))
    : compiler.run(logHandler("run"));
};
