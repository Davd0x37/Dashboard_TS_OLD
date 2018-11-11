import { Plugin, Resolve, RuleSetRule } from "webpack";

export interface IWebpackConfigFile {
  mode?: "development" | "production";
  target?: "node" | "web";
  context?: string;
  entry?: string | { [key: string]: string[] };
  output: {
    path?: string;
    filename?: string;
  };
  resolve?: Resolve;
  module?: {
    rules: RuleSetRule[];
  };
  plugins?: Plugin[];
  optimization?: {
    minimizer?: Plugin[];
  };
  externals?: any[];
  devServer?: {
    port?: number;
    compress?: boolean;
    hot?: boolean;
  };
}
