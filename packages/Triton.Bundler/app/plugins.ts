import CopyWebpackPlugin from "copy-webpack-plugin";
import Fork from "fork-ts-checker-webpack-plugin";
import Happy from "happypack";
import Hard from "hard-source-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ScriptExtHtmlWebpackPlugin from "script-ext-html-webpack-plugin";
import { DllPlugin as Dll, Plugin, HotModuleReplacementPlugin } from "webpack";

// Extract CSS
export const CssExtract = ({
  filename = "[name].css",
  chunkFilename = "[id].css"
}: {
  filename?: string;
  chunkFilename?: string;
} = {}): Plugin =>
  new MiniCssExtractPlugin({
    filename,
    chunkFilename
  });

// Generate HTML file and insert assets
export const HtmlPlugin = ({
  template,
  filename,
  minify
}: {
  template: string;
  filename: string;
  minify?: {};
}): Plugin =>
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
export const CopyPlugin = (copy: { from: string; to: string }[]): Plugin => new CopyWebpackPlugin(copy);

// Hot Module Replacement
export const HMR = ({ multiStep = true }: { multiStep?: boolean } = {}): Plugin =>
  new HotModuleReplacementPlugin({ multiStep });

// Speed improvements
export const HappyPack = ({ threads = 2 }: { threads?: number } = {}): Plugin =>
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
  path?: string;
  name?: string;
}): Plugin =>
  new Dll({
    path,
    name
  });
