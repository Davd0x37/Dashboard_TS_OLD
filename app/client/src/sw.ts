const version = "0.0.4";
const cacheName = `Dashboard-${version}`;
const filesToCache = [
  "./avatar.f01dff67.png",
  "./header_pattern.b3436a1b.png",
  "./index.html",
  "./logo_1x.d3eddc66.png",
  "./main.4d81cc8a.js",
  "./manifest.976e13c1.webmanifest",
  "./polyfill.min.7d85f7c4.js",
  "./scss.81554d6a.css",
  "./scss.81554d6a.js",
  "./ServiceWorker.7a9391e0.js"
  // "./sw.js"
  // "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900",
  // "https://use.fontawesome.com/releases/v5.1.1/js/all.js"
];

const DashboardSW = {
  /**
   * Add files to cache
   * @param {string[]} files
   * @returns {Promise<void>}
   */
  cacheFiles(files: string[]): Promise<void> {
    return caches.open(cacheName).then((cache: any) => {
      // console.log("Cached page files");
      return cache.addAll(files);
    });
  },

  /**
   * Update cache
   * Get newest files from server, put them into cache and then return response
   * @param req
   * @returns {Promise<Response>}
   */
  updateCache(req: Request) {
    return fetch(req).then((res: any) => {
      caches.open(cacheName).then((cache: any) => cache.put(req, res.clone()));
      return res;
    });
  },

  /**
   * Open cache and return promise with that cache ->
   * Match returned cache with request and return promise with result ->
   * If requested file cannot be downloaded or reject promise
   * In fetch listener it will catch rejection and re-download files from server
   * @param req
   * @returns {Promise<Cache>}
   */
  filesFromCache(req: Request) {
    return caches.open(cacheName).then((cache: any) => {
      return cache.match(req).then((matching: any) => {
        return matching || Promise.reject("No matching files in cache!");
      });
    });
  },

  /**
   * Download files from server
   * @param {Request} req
   * @returns {Promise<Response>}
   */
  filesFromServer(req: Request) {
    return fetch(req).then(res => res);
  }
};

/**
 * Download files and put them into cache
 * Install service worker
 */
self.addEventListener("install", (event: any) => {
  event.waitUntil(DashboardSW.cacheFiles(filesToCache));
});

/**
 * Fetch listener
 * Event respond with -> first find files in cache with passed request and return them back otherwise download files from server
 * While responding with stored cache we update the cache to the newest version
 */
self.addEventListener("fetch", (event: any) => {
  if (event.request.method !== "GET") {
    return;
  }
  console.log("Serving the assets from cache");
  event.respondWith(DashboardSW.filesFromCache(event.request).catch(() => DashboardSW.filesFromServer(event.request)));
  event.waitUntil(DashboardSW.updateCache(event.request));
});

/*
 * Make service worker main maintainer of site and remove old caches if new version has arrived
 */
self.addEventListener("activate", event => {
  event.waitUntil(
    caches
      .keys()
      .then(keys =>
        Promise.all(
          keys.map(key => {
            if (!cacheName.includes(key)) {
              return caches.delete(key);
            }
          })
        )
      )
      .then(() => {
        console.log(`${cacheName} now ready to handle fetches!`);
      })
  );
  return self.clients.claim();
});
