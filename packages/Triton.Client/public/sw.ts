const version = "1.0.0";
const cacheName = `Dashboard-${version}`;
const filesToCache: any[] = [
  "/",
  "/index.html",
  "app.js",
  "app.css",
  "background_bridge.jpg",
  "background_mobile.webp"
];

const DashboardSW = {
  async cacheFiles(files: any[]): Promise<void> {
    const cache = await caches.open(cacheName);
    await cache.addAll(files);
    // @ts-ignore
    return self.skipWaiting();
  },

  async updateCache(req: Request, onlySelected: boolean = false): Promise<Response> {
    const res = await fetch(req);
    const cache = await caches.open(cacheName);
    if (onlySelected) {
      filesToCache.map(item => {
        const file = new URL(item, self.location.toString());
        if (file.href === req.url) {
          cache.put(req, res.clone());
        }
      });
    } else {
      cache.put(req, res.clone());
    }
    return res;
  },

  async filesFromCache(req: Request): Promise<Response> {
    const cache = await caches.open(cacheName);
    const matching = await cache.match(req);
    return matching || DashboardSW.filesFromServer(req);
  },

  async filesFromServer(req: Request): Promise<Response> {
    const res = await fetch(req);
    return res;
  },

  filesURL: (files: string[]): URL[] => files.map(item => new URL(item, self.location.toString()))
};

/**
 * Download files and put them into cache
 * Install service worker
 */
self.addEventListener("install", (event: any) => {
  event.waitUntil(DashboardSW.cacheFiles(filesToCache));
});

/*
 * Make service worker main maintainer of site and remove old caches
 * if new version has arrived
 */
self.addEventListener("activate", async (event: any) => {
  const keys = await caches.keys();
  event.waitUntil(
    Promise.all(
      keys.map((key: any) => {
        if (!cacheName.includes(key)) {
          return caches.delete(key);
        }
      })
    ).then(() => console.log(`${cacheName} now ready to handle fetches!`))
  );
  // @ts-ignore
  return self.clients.claim();
});

/**
 * Fetch listener
 * Event respond with -> first find files in cache with passed
 * request and return them back otherwise download files from server
 * While responding with stored cache we update the cache to the newest version
 */
self.addEventListener("fetch", (event: any) => {
  if (event.request.method !== "GET") {
    return;
  }
  console.log("Serving the assets from cache");
  event.respondWith(DashboardSW.filesFromCache(event.request));
  event.waitUntil(DashboardSW.updateCache(event.request, true));
});
