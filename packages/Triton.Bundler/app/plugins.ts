import CopyWebpackPlugin from "copy-webpack-plugin";
import Fork from "fork-ts-checker-webpack-plugin";
import Happy from "happypack";
import Hard from "hard-source-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ScriptExtHtmlWebpackPlugin from "script-ext-html-webpack-plugin";
import { DllPlugin as Dll, HotModuleReplacementPlugin, Plugin } from "webpack";

// Extract CSS
export const CssExtract = ({
  filename = "[name].css",
  chunkFilename = "[id].css"
}: {
  readonly filename?: string;
  readonly chunkFilename?: string;
} = {}): Plugin =>
  new MiniCssExtractPlugin({
    filename,
    chunkFilename
  });

// Generate HTML file and insert assets
export const HtmlPlugin = ({
  template = "public/index.html",
  filename = "index.html",
  minify
}: {
  readonly template?: string;
  readonly filename?: string;
  readonly minify?: {};
} = {}): Plugin =>
  new HtmlWebpackPlugin({
    template,
    filename,
    minify: {
      removeAttributeQuotes: false,
      html5: true,
      quoteCharacter: '"',
      ...minify
    }
  });

// Add defer to all scripts in index.html
export const HtmlExtensions = (): Plugin =>
  new ScriptExtHtmlWebpackPlugin({
    defaultAttribute: "defer"
  });

// Copy file from dir to dir
export const CopyPlugin = (
  copy: ReadonlyArray<{ readonly from: string; readonly to: string }>
): Plugin => new CopyWebpackPlugin(copy);

// Hot Module Replacement
export const HMR = ({
  multiStep = true
}: { readonly multiStep?: boolean } = {}): Plugin =>
  new HotModuleReplacementPlugin({ multiStep });

// Speed improvements
export const HappyPack = ({
  threads = 2
}: { readonly threads?: number } = {}): Plugin =>
  new Happy({
    id: "ts",
    threads,
    loaders: [
      {
        path: "ts-loader",
        query: {
          happyPackMode: true
        }
      }
    ]
  });

export const ForkTS = (): Plugin => new Fork({ checkSyntacticErrors: true });

export const HardSource = (): Plugin => new Hard();

export const DllPlugin = ({
  path = "build/[name]-manifest.json",
  name = "[name]_[hash]"
}: {
  readonly path?: string;
  readonly name?: string;
}): Plugin =>
  new Dll({
    path,
    name
  });