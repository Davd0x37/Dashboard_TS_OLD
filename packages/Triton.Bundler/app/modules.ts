import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { RuleSetRule } from "webpack";

export const GraphqlModule = (): RuleSetRule => ({
  test: /\.(gql|graphql)$/,
  exclude: /node_modules/,
  use: "raw-loader"
});

export const HtmlModule = ({
  minimize = true
}: { readonly minimize?: boolean } = {}): RuleSetRule => ({
  test: /\.html$/,
  use: [{ loader: "html-loader", options: { minimize } }]
});

export const TypescriptModule = (): RuleSetRule => ({
  test: /\.tsx?$/,
  exclude: /node_modules/,
  loader: "happypack/loader?id=ts"
});

export const JavascriptModule = (): RuleSetRule => ({
  type: "javascript/auto",
  test: /\.mjs?$/,
  use: []
});

export const ScssModule = (): RuleSetRule => ({
  test: /\.scss$/,
  use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
});

export const AssetsModule = ({
  output = "./img/[name].[ext]"
}: { readonly output?: string } = {}): RuleSetRule => ({
  test: /\.(png|svg|jpg|gif|webp)$/,
  use: [
    {
      loader: "url-loader",
      options: {
        name: output,
        limit: 10000
      }
    },
    {
      loader: "img-loader"
    }
  ]
});
