import program from "commander";
import { readFileSync, writeFileSync } from "fs";
// @ts-ignore
import parcel from "parcel-bundler";
import { resolve } from "path";

program
  .version("0.0.1")
  .option("-w, --watch [boolean]", "Watch files", false)
  .option("-d, --out-dir [dir]", "Set output directory", "./dist")
  .option("-p, --port [number]", "Set output directory", 3030)
  .option("-c, --cache [boolean]", "Save cache", false)
  .option("-s, --source-maps [boolean]", "Use source maps", false)
  .option("-m, --minify [boolean]", "Minify output files", false)
  .option("-h, --hmr [boolean]", "Hot module replacement", false)
  .option("-z, --worker [boolean]", "Use service worker", false)
  .option("-t, --target [target]", "Select build target (browser/node/electron)", "browser")
  .parse(process.argv);

const model = {
  changedFiles: new Set(),
  bundler: null as any,
  entryFiles: resolve(__dirname, "./src/index.html"),
  serviceWorker: {
    regex: /\"fluidity-inject-cache-files\"/g,
    file: resolve(__dirname, "dist", "sw.js")
  },
  parcelOptions: {
    outDir: program.outDir,
    outFile: "index.html",
    watch: program.watch,
    cache: program.cache,
    cacheDir: ".cache",
    minify: program.minify,
    scopeHoist: false,
    target: program.target,
    logLevel: 3,
    hmr: program.hmr,
    hmrPort: 0,
    sourceMaps: program.sourceMaps,
    hmrHostname: "",
    detailedReport: false
  }
};

const Fluidity = {
  async run() {
    model.bundler = new parcel(model.entryFiles, model.parcelOptions);
    if (program.watch) {
      model.bundler.serve(program.port);
    } else {
      model.bundler.bundle();
    }

    model.bundler.on("bundled", (bundle: any) => handlers.onBundled(bundle));
    model.bundler.on("buildStart", (entryFiles: any) => handlers.onBuildStart(entryFiles));
    model.bundler.on("buildEnd", () => handlers.onBuildEnd());
    model.bundler.on("buildError", (error: any) => handlers.onBuildError(error));
  },

  /**
   * Save hashed files in array
   *
   * @param {*} bundle
   */
  async saveChangedFiles(bundle: any) {
    for (const item of bundle.bundleNameMap.values()) {
      model.changedFiles.add(item);
    }
  },

  /**
   * Add files to service worker
   *
   */
  async serviceWorker() {
    const file = readFileSync(model.serviceWorker.file, "utf-8");
    const changedFiles = this.normalizeFiles(model.changedFiles);
    const res = file.replace(model.serviceWorker.regex, changedFiles);
    writeFileSync(model.serviceWorker.file, res);
  },

  /**
   * Return files array as string with ""
   *
   * @param {Set<any>} files
   * @returns {string}
   */
  normalizeFiles(files: Set<any>): string {
    const res: any[] = [];
    files.forEach(item => res.push(`"${item}"`));
    return res.toString();
  }
};

const handlers = {
  async onBundled(_: any) {
    if (program.worker) {
      Fluidity.saveChangedFiles(model.bundler);
      Fluidity.serviceWorker();
    }
  },

  async onBuildStart(_: any) {
    // FILL
  },

  async onBuildEnd() {
    // FILL
  },

  async onBuildError(_: any) {
    // FILL
  }
};

(async () => {
  await Fluidity.run();
})();
