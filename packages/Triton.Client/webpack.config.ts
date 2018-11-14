import CopyWebpackPlugin from "copy-webpack-plugin";
import Fork from "fork-ts-checker-webpack-plugin";
import Happy from "happypack";
import Hard from "hard-source-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { resolve } from "path";
import ScriptExtHtmlWebpackPlugin from "script-ext-html-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import { HotModuleReplacementPlugin } from "webpack";

const r = (path: string) => resolve(__dirname, path);

/**
 * Default settings for browser
 */
export default (env: any = { dev: false }) => ({
  entry: {
    App: r("app/App.ts")
  },
  mode: env.dev ? "development" : "production",
  context: __dirname,
  target: "web",
  output: {
    path: r("build/app"),
    filename: "[name].js",
    pathinfo: false
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    plugins: [new TsconfigPathsPlugin({ configFile: "tsconfig.json" })]
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{ loader: "html-loader", options: { minimize: true } }]
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "happypack/loader?id=ts"
      },
      {
        type: "javascript/auto",
        test: /\.mjs?$/,
        use: []
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif|webp)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "./img/[name].[ext]",
              limit: 10000
            }
          },
          {
            loader: "img-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      filename: "index.html",
      minify: {
        removeAttributeQuotes: false,
        html5: true,
        quoteCharacter: '"'
      }
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: "defer"
    }),
    new CopyWebpackPlugin([
      { from: "public/manifest.webmanifest", to: "./manifest.webmanifest" },
      { from: "public/img/logo_1x.webp", to: "./img/logo_1x.webp" },
    ]),
    new HotModuleReplacementPlugin({ multiStep: true }),
    new Happy({
      id: "ts",
      threads: 2,
      loaders: [
        {
          path: "ts-loader",
          query: {
            happyPackMode: true
          }
        }
      ]
    }),
    new Fork({ checkSyntacticErrors: true }),
    new Hard()
    // new DllPlugin({
    //   path: "build/[name]-manifest.json",
    //   name: "[name]_[hash]"
    // })
  ],
  optimization: {
    minimizer: env.dev ? [] : [new TerserPlugin({ parallel: 2 })]
  },
  devServer: {
    hot: true,
    contentBase: "build/app",
    port: 3000,
    compress: true
  },
  // watchOptions: { poll: false },
  // stats: "minimal",
  node: {
    __dirname: false
  }
});
