import { Plugin, RuleSetRule, Resolve } from "webpack";

export interface IWebpack {
  entry: string | { [key: string]: string[] };
}

export interface IWebpackConfigFile {
  mode: "development" | "production";
  target: "node" | "web";
  context: string;
  output: {
    path?: string;
    filename?: string;
  };
  resolve: Resolve;
  module: {
    rules: RuleSetRule[];
  };
  plugins?: Plugin[];
}

export interface IResolve {
  resolve: ({ configFile, extensions }: { configFile?: string; extensions?: string[] }) => Resolve;
}

export interface IModules {
  graphql: () => RuleSetRule;
  html: ({ minimize }: { minimize?: boolean }) => RuleSetRule;
  typescript: () => RuleSetRule;
  javascript: () => RuleSetRule;
  scss: () => RuleSetRule;
  assets: ({ output }: { output?: string }) => RuleSetRule;
}

export interface IPlugins {
  CssExtract: ({ filename, chunkFilename }: { filename?: string; chunkFilename?: string }) => Plugin;
  HtmlPlugin: ({ template, filename, minify }: { template: string; filename: string; minify: {} }) => Plugin;
  HtmlExtensions: () => Plugin;
  CopyPlugin: ({ copy }: { copy: [{ from: string; to: string }] }) => Plugin;
  HappyPack: ({ threads }: { threads?: number }) => Plugin;
  ForkTS: () => Plugin;
  HardSource: () => Plugin;
  DllPlugin: ({ path, name }: { path?: string; name?: string }) => Plugin;
}
