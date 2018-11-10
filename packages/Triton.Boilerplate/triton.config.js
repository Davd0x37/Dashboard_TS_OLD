"use strict";
exports.__esModule = true;
var plugins_1 = require("@triton/bundler/build/plugins");
var config = {
    // entry: {
    //   App: ["./app/App.ts"],
    //   // ServiceWorker: ["./public/ServiceWorker.ts"],
    //   // sw: ["./public/sw.ts"]
    // },
    output: {
    // path: resolve(__dirname, "build/app"),
    // filename: "[name].js"
    },
    plugins: [
        plugins_1.HappyPack(),
        plugins_1.HardSource(),
        plugins_1.ForkTS(),
    ]
};
exports["default"] = config;
