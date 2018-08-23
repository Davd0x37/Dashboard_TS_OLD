if (navigator.serviceWorker.controller) {
  console.log("Service worker is active.");
} else {
  navigator.serviceWorker
    .register("../sw.ts", {
      scope: "./"
    })
    .then((reg: any) => {
      console.log(`Service worker has been registered for scope: ${reg.scope}`);
    });
}
