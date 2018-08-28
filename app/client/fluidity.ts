import program from "commander";
import { readFileSync, writeFileSync } from "fs";
// @ts-ignore
import parcel from "parcel-bundler";
import { resolve } from "path";

const model = {
  changedFiles: new Set(),
  bundler: null as any,
  entryFiles: resolve(__dirname, "./src/index.html"),
  program: null as any,
  serviceWorker: {
    regex: /\"fluidity-inject-cache-files\"/g,
    file: resolve(__dirname, "dist", "sw.js")
  },
  parcelOptions: {
    outDir: "./dist",
    outFile: "index.html",
    watch: false,
    cache: false,
    cacheDir: ".cache",
    minify: true,
    scopeHoist: false,
    target: "node",
    logLevel: 3,
    hmr: false,
    hmrPort: 0,
    sourceMaps: false,
    hmrHostname: "",
    detailedReport: false
  }
};

const cli = {
  init() {
    model.program = program
      .version("0.0.1")
      .option("-w, --watch [boolean]", "Watch files", false)
      .option("-d, --out-dir [dir]", "Set output directory", "dist")
      .option("-p, --port [number]", "Set output directory", 3030)
      .option("-c, --cache [boolean]", "Save cache", false)
      .option("-s, --source-maps [boolean]", "Use source maps", false)
      .option("-m, --minify [boolean]", "Minify output files", false)
      .option("-h, --hmr [boolean]", "Hot module replacement", false)
      .option("-t, --target [target]", "Select build target (browser/node/electron)", "browser")
      .parse(process.argv);
  },

  rebuildOptions() {
    model.parcelOptions = {
      ...model.parcelOptions,
      watch: model.program.watch,
      outDir: model.program.outDir,
      cache: model.program.cache,
      sourceMaps: model.program.sourceMaps,
      minify: model.program.minify,
      hmr: model.program.hmr,
      target: model.program.target
    };
  }
};

const Fluidity = {
  async init() {
    await cli.init();
    await cli.rebuildOptions();
  },

  async run() {
    model.bundler = new parcel(model.entryFiles, model.parcelOptions);
    if (model.program.watch) {
      model.bundler.serve(model.program.port);
    } else {
      model.bundler.bundle();
    }

    model.bundler.on("bundled", (bundle: any) => this.onBundled(bundle));
    model.bundler.on("buildStart", (entryFiles: any) => this.onBuildStart(entryFiles));
    model.bundler.on("buildEnd", () => this.onBuildEnd());
    model.bundler.on("buildError", (error: any) => this.onBuildError(error));
  },

  async onBundled(_: any) {
    this.saveChangedFiles(model.bundler);
    this.serviceWorkerFiles();
  },

  async onBuildStart(_: any) {
    // FILL
  },

  async onBuildEnd() {
    // FILL
  },

  async onBuildError(_: any) {
    // FILL
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
  async serviceWorkerFiles() {
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

(async () => {
  await Fluidity.init();
  await Fluidity.run();
})();
