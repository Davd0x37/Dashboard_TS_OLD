import program from "commander";
import { readFileSync, writeFileSync } from "fs";
// @ts-ignore
import parcel from "parcel-bundler";
import { resolve } from "path";

const model = {
  changedFiles: new Set(),
  bundler: null as any,
  serviceWorker: {
    regex: /\"fluidity-inject-cache-files\"/g,
    file: resolve(__dirname, "dist", "sw.js")
  }
};

program.option("-w, --watch [boolean]", "Watch", false).action(bundle);
program.parse(process.argv);

async function bundle(cmd: any) {
  let entryFiles = "src/index.html";
  let options = {
    outFile: "",
    watch: cmd.watch,
    cache: cmd.watch ? true : false,
    cacheDir: ".cache",
    minify: cmd.watch ? false : false,
    target: "browser",
    hmr: cmd.watch ? true : false,
    sourceMaps: false
  };

  await run(entryFiles, options);
}

function run(entryFiles: string, options: any) {
  const bundler = new parcel(resolve(__dirname, entryFiles), options);
  if (program.watch) {
    bundler.serve(program.port);
  } else {
    bundler.bundle();
  }

  bundler.on("bundled", (bundle: any) => handlers.onBundled(bundle));
  bundler.on("buildStart", (entryFiles: any) => handlers.onBuildStart(entryFiles));
  bundler.on("buildEnd", () => handlers.onBuildEnd());
  bundler.on("buildError", (error: any) => handlers.onBuildError(error));
  
  model.bundler = bundler;
}

const handlers = {
  async onBundled(_: any) {
    actions.saveChangedFiles();
    actions.serviceWorker();
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

const actions = {
  /**
   * Save hashed files in array
   *
   */
  async saveChangedFiles() {
    for (const item of model.bundler.bundleNameMap.values()) {
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
