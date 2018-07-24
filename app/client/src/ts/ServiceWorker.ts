if (navigator.serviceWorker.controller) {
  console.log("[PWA Builder] active service worker found, no need to register");
} else {
  navigator.serviceWorker
    .register("/sw.ts", {
      scope: "./"
    })
    .then((reg: any) => {
      console.log(`Service worker has been registered for scope: ${reg.scope}`);
    });
}