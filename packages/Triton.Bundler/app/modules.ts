import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { IModules } from "./Interfaces";

const modules: IModules = {
  graphql: () => ({
    test: /\.(gql|graphql)$/,
    exclude: /node_modules/,
    use: "raw-loader"
  }),

  html: ({ minimize = true }: { minimize?: boolean } = {}) => ({
    test: /\.html$/,
    use: [{ loader: "html-loader", options: { minimize } }]
  }),

  typescript: () => ({
    test: /\.tsx?$/,
    exclude: /node_modules/,
    loader: "happypack/loader?id=ts"
  }),

  javascript: () => ({
    type: "javascript/auto",
    test: /\.mjs?$/,
    use: []
  }),

  scss: () => ({
    test: /\.scss$/,
    use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
  }),

  assets: ({ output = "./img/[name].[ext]" }: { output?: string } = {}) => ({
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
  })
};

export default modules;
