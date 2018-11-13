import { resolve as res } from "path";
import { Configuration } from "webpack";
import { IWebpackConfigFile } from "./Interfaces";
import {
  AssetsModule,
  HtmlModule,
  JavascriptModule,
  ScssModule,
  TypescriptModule
} from "./modules";
import {
  CssExtract,
  ForkTS,
  HappyPack,
  HardSource,
  HtmlExtensions,
  HtmlPlugin
} from "./plugins";
import { optimizationMinimizer, resolve } from "./settings";

const r = (path: string) => res(process.cwd(), path);

/**
 * Default settings for browser
 */
export default (config: IWebpackConfigFile): Configuration => ({
  entry: config.entry || { App: r("app/App.ts") },
  mode: config.mode || "production",
  context: config.context || process.cwd(),
  target: config.target || "web",
  output: {
    path: config.output.path || r("build/app"),
    filename: config.output.filename || "[name].js",
    pathinfo: false
  },
  resolve: config.resolve || resolve(),
  module: config.module || {
    rules: [
      TypescriptModule(),
      JavascriptModule(),
      ScssModule(),
      AssetsModule(),
      HtmlModule()
    ]
  },
  plugins: config.plugins || [
    HappyPack(),
    ForkTS(),
    HardSource(),
    CssExtract(),
    HtmlPlugin({ template: "public/index.html", filename: "index.html" }),
    HtmlExtensions()
  ],
  optimization: config.optimization || {
    minimizer: config.mode === "development" ? [] : [optimizationMinimizer()]
  },
  externals: config.externals,
  resolveLoader: {
    modules: [res(__dirname, "../", "node_modules")]
  },
  // @ts-ignore
  devServer: {
    ...(config.target === "web" ? { hot: true } : { hotOnly: true }),
    port: 9000,
    compress: true
  },
  watchOptions: { poll: false },
  stats: "minimal",
  node: {
    __dirname: false
  }
});
