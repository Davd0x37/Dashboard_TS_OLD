import "babel-polyfill";

// import App from "./App";

// App.run();

// // import idb from "pouchdb-adapter-idb"
// import RxDB from "rxdb";
// (async () => {
//   // RxDB.plugin(idb);
//   const db = await RxDB.create({
//     name: "dashboard", // <- name
//     adapter: "idb", // <- storage-adapter
//     password: "DashboardTSPass", // <- password (optional)
//     multiInstance: true, // <- multiInstance (optional, default: true)
//     queryChangeDetection: false // <- queryChangeDetection (optional, default: false)
//   });
//   db.$.subscribe(changeEvent => console.dir(changeEvent));
//   const schema = {
//     keyCompression: true,
//     version: 1,
//     title: "user schema",
//     type: "object",
//     properties: {
//       name: {
//         type: "string",
//         primary: true
//       },
//       color: {
//           type: "string"
//       },
//     },
//     required: ['name']
//   }
//   await db.collection({
//     name: "user",
//     autoMigrate: true,
//     schema
//   })
// })();

import { create, fromEvent } from "./lib/Observable";

// const obs = create([1, 2, 3, 4, 5])
//   .map((item: number) => item * 2)
//   .filter((item: number) => item > 0)
//   .subscribe({
//     next(val: any) {
//       console.log(val);
//     },
//     error(err: any) {
//       console.log(err);
//     },
//     complete() {
//       console.log("DONE");
//     }
//   });
// obs.unsubscribe();
const el = fromEvent(document.querySelector("#ASD")! as HTMLElement, "click")
// .debounce(-5)
.subscribe({
  next(val: any) {
    console.log(val)
  }
})