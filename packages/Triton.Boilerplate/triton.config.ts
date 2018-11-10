import { IWebpackConfigFile } from "@triton/bundler/build/Interfaces";
import { ForkTS, HappyPack, HardSource } from "@triton/bundler/build/plugins";

const config: IWebpackConfigFile = {
  output: {},
  plugins: [HappyPack(), HardSource(), ForkTS()]
};

export default config;
