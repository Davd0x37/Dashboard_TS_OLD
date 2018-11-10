import { IWebpackConfigFile } from "./Interfaces";
import { AssetsModule, HtmlModule, JavascriptModule, ScssModule, TypescriptModule } from "./modules";
import { CssExtract, ForkTS, HappyPack, HardSource, HtmlExtensions, HtmlPlugin } from "./plugins";
import { optimizationMinimizer, resolve } from "./settings";
import { Configuration } from "webpack";
import { resolve as res } from "path";

const r = (path: string) => res(process.cwd(), path);

/**
 * Default settings for browser
 */
export default (config: IWebpackConfigFile): Configuration => ({
  entry: config.entry || r("app/App.ts"),
  mode: config.mode || "production",
  context: config.context || process.cwd(),
  target: config.target || "web",
  output: {
    path: config.output.path || r("build/app"),
    filename: config.output.filename || "[name].js"
  },
  resolve: config.resolve || resolve(),
  module: config.module || {
    rules: [TypescriptModule(), JavascriptModule(), ScssModule(), AssetsModule(), HtmlModule()]
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
    minimizer: config.mode === "production" ? [optimizationMinimizer()] : []
  },
  externals: config.externals,
  resolveLoader: {
    modules: [res(__dirname, "../", "node_modules")]
  }
});
