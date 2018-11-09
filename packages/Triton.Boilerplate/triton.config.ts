import { modules } from "@triton/bundler";
import { IModules, IWebpackConfigFile } from "@triton/bundler/build/Interfaces";

const config: IWebpack = {
  entry: {
    App: ["./app/App.ts"],
    ServiceWorker: ["./public/ServiceWorker.ts"],
    sw: ["./public/sw.ts"]
  }
};

// html: {
//   template: "./public/index.html",
//   filename: "./index.html"
// },
// externals: [
//   {
//     from: "public/manifest.webmanifest",
//     to: "dist/manifest.webmanifest"
//   },
//   {
//     from: "public/img/logo_1x.webp",
//     to: "dist/img/logo_1x.webp"
//   }
// ],
