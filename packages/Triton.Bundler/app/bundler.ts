import webpackConfig from "./webpack.config";
import { fileExistsSync } from "tsconfig-paths/lib/filesystem";
import { resolve } from "path";
import { IWebpackConfigFile } from "./Interfaces";

const data = {
  configFile: "triton.config.js"
};

const configFile = async (config: string = data.configFile): Promise<IWebpackConfigFile> => {
  const path = resolve(process.cwd(), config);
  if (fileExistsSync(path)) {
    return await import(path);
  }
  return {
    output: {}
  };
};

export default async (env: any) => {
  const config = webpackConfig({
    output: {}
  });
  console.log(config);
};
