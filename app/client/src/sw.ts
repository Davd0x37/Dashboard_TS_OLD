const version = "0.0.6";
const cacheName = `Dashboard-${version}`;
const filesToCache = [
  "index.html",
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
   updateCache(req: Request): Promise<Response> {
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
  filesFromCache(req: Request): Promise<Cache> {
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
  filesFromServer(req: Request): Promise<Response> {
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
  event.respondWith(
    DashboardSW.filesFromCache(event.request).catch(() =>
      DashboardSW.filesFromServer(event.request)
    )
  );
  event.waitUntil(DashboardSW.updateCache(event.request));
});

/*
 * Make service worker main maintainer of site and remove old caches if new version has arrived
 */
self.addEventListener("activate", (event: any) => {
  event.waitUntil(
    caches
      .keys()
      .then(keys =>
        Promise.all(
          // @ts-ignore
          keys.map((key: any) => {
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
  // @ts-ignore
  return self.clients.claim();
});
