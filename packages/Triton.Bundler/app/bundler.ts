import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { fileExistsSync } from 'tsconfig-paths/lib/filesystem';
import webpack, { Stats } from 'webpack';
import { IWebpackConfigFile } from './Interfaces';
import webpackConfig from './webpack.config';


const data = {
  configFile: "triton.config.js"
};

const configFile = async (config: string = data.configFile): Promise<{ default: IWebpackConfigFile }> => {
  const path = resolve(process.cwd(), config);
  if (fileExistsSync(path)) {
    const file = await import(path);
    return file;
  }
  return {
    default: { output: {} }
  };
};

export default async (env: any) => {
  const file = await configFile(env.config);
  const config = webpackConfig(file.default);
  if (env.dev) {
    config.mode = "development";
  }
  const compiler = await webpack(config);
  await compiler.run((_: Error, stats: Stats) => {
    writeFileSync(resolve(__dirname, "../", `logs/${(new Date().toISOString()).replace(":", "-").replace(":", "-")}.txt`), stats, { encoding: "utf-8" });
  });
};
