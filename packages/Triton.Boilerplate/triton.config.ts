// import { HtmlModule, AssetsModule, TypescriptModule, ScssModule } from "@triton/bundler/build/modules";
import { IWebpackConfigFile } from '@triton/bundler/build/Interfaces';
import {
  CopyPlugin,
  CssExtract,
  ForkTS,
  HappyPack,
  HardSource,
  HtmlExtensions,
  HtmlPlugin,
} from '@triton/bundler/build/plugins';

const config: IWebpackConfigFile = {
  entry: {
    App: ["./app/App.ts"],
    ServiceWorker: ["./public/ServiceWorker.ts"],
    sw: ["./public/sw.ts"]
  },
  output: {},
  // module: {
  //   rules: [HtmlModule(), AssetsModule(), TypescriptModule(), ScssModule()]
  // },
  plugins: [
    HappyPack(),
    HardSource(),
    ForkTS(),
    HtmlPlugin({
      template: "./public/index.html",
      filename: "./index.html"
    }),
    HtmlExtensions(),
    CssExtract(),
    CopyPlugin([
      {
        from: "public/manifest.webmanifest",
        to: "dist/manifest.webmanifest"
      },
      {
        from: "public/img/logo_1x.webp",
        to: "dist/img/logo_1x.webp"
      }
    ])
  ]
};

export default config;
