import { Configuration } from "webpack";
import { IWebpackConfigFile } from "./Interfaces";
import { GraphqlModule, TypescriptModule } from "./modules";
import { ForkTS, HappyPack, HardSource } from "./plugins";
import WebpackConfig from "./webpack.config";

export default (config: IWebpackConfigFile): Configuration =>
  WebpackConfig({
    mode: config.mode,
    target: "node",
    output: {},
    module: {
      rules: [TypescriptModule(), GraphqlModule()]
    },
    plugins: [HappyPack(), ForkTS(), HardSource()]
  });
