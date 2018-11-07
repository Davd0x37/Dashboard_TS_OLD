const { resolve } = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const webpack = require("webpack");
const HappyPack = require("happypack");
const ForkTS = require("fork-ts-checker-webpack-plugin");
const HardSource = require("hard-source-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");

module.exports = env => {
  return {
    mode: env.mode,
    entry: {
      app: ["./app/App.ts"],
      ServiceWorker: ["./public/ServiceWorker.ts"],
      sw: ["./public/sw.ts"]
    },
    target: "web",
    context: __dirname,
    output: {
      path: resolve(__dirname, "dist"),
      filename: "[name].js"
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: [resolve(__dirname, "app"), resolve(__dirname, "public"), resolve(__dirname, "../Shared")],
          exclude: /node_modules/,
          loader: "happypack/loader?id=ts"
        },
        {
          test: /\.(gql|graphql)$/,
          include: resolve(__dirname, "app"),
          exclude: /node_modules/,
          use: "raw-loader"
        },
        {
          // Must be here otherwsie webpack won't find any modules
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
        },
        {
          test: /\.html$/,
          use: [{ loader: "html-loader", options: { minimize: true } }]
        }
      ]
    },

    externals: ["chart.js"],

    optimization: {
      minimizer: [
        new TerserPlugin({
          parallel: true
        }),
        new OptimizeCSSAssetsPlugin()
      ]
    },

    resolve: {
      extensions: [".ts", ".tsx", ".js"],
      plugins: [new TsconfigPathsPlugin({ configFile: resolve(__dirname, "tsconfig.json") })]
    },

    devServer: {
      contentBase: resolve(__dirname, "dist"),
      compress: true,
      port: 3030
    },

    plugins: [
      // Run bundling in parallel
      new HappyPack({
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
      // Run TypeScript checking in separate process
      new ForkTS({ checkSyntacticErrors: true }),

      new webpack.DllPlugin({
        path: resolve(__dirname, "dist", "[name]-manifest.json"),
        name: "[name]_[hash]"
      }),
      new HardSource(),
      // Extract CSS
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),
      // Generate HTML file and insert assets
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        filename: "./index.html",
        minify: {
          removeAttributeQuotes: false,
          html5: true,
          quoteCharacter: '"'
        }
      }),
      // Add defer to all scripts in index.html
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: "defer"
      }),
      // Copy manifest and all images to dir
      new CopyWebpackPlugin([
        {
          from: resolve(__dirname, "public/manifest.webmanifest"),
          to: resolve(__dirname, "dist/manifest.webmanifest")
        },
        {
          from: resolve(__dirname, "public/img/logo_1x.webp"),
          to: resolve(__dirname, "dist/img/logo_1x.webp")
        }
      ])
    ]
  };
};
