import CopyWebpackPlugin from 'copy-webpack-plugin';
import ForkTS from 'fork-ts-checker-webpack-plugin';
import HappyPack from 'happypack';
import HardSource from 'hard-source-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
import { DllPlugin } from 'webpack';
import { IPlugins } from './Interfaces';



const plugins: IPlugins = {
  // Extract CSS
  CssExtract: ({
    filename = "[name].css",
    chunkFilename = "[id].css"
  }: {
    filename?: string;
    chunkFilename?: string;
  }) =>
    new MiniCssExtractPlugin({
      filename,
      chunkFilename
    }),

  // Generate HTML file and insert assets
  HtmlPlugin: ({ template, filename, minify }: { template: string; filename: string; minify: {} }) =>
    new HtmlWebpackPlugin({
      template,
      filename,
      minify: {
        removeAttributeQuotes: false,
        html5: true,
        quoteCharacter: '"',
        ...minify
      }
    }),

  // Add defer to all scripts in index.html
  HtmlExtensions: () =>
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: "defer"
    }),

  // Copy file from dir to dir
  CopyPlugin: ({ copy }: { copy: [{ from: string; to: string }] }) => new CopyWebpackPlugin(copy),

  // Speed improvements
  HappyPack: ({ threads = 2 }: { threads?: number }) =>
    new HappyPack({
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
    }),
  ForkTS: () => new ForkTS({ checkSyntacticErrors: true }),
  HardSource: () => new HardSource(),
  DllPlugin: ({ path = "build/[name]-manifest.json", name = "[name]_[hash]" }: { path?: string; name?: string }) =>
    new DllPlugin({
      path,
      name
    })
};

export default plugins;
