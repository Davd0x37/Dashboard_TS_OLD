import { IWebpackConfigFile } from "./Interfaces";
import { AssetsModule, HtmlModule, JavascriptModule, ScssModule, TypescriptModule } from "./modules";
import { CssExtract, ForkTS, HappyPack, HardSource, HtmlExtensions, HtmlPlugin } from "./plugins";
import { optimizationMinimizer, resolve } from "./settings";
import { Configuration } from "webpack";

/**
 * Default settings for browser
 */
export default (config: IWebpackConfigFile): Configuration => ({
  entry: config.entry || "app/App.ts",
  mode: config.mode || "production",
  context: config.context || process.cwd(),
  target: config.target || "web",
  output: {
    path: config.output.path || "build/app",
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
  externals: config.externals
});
