import "babel-polyfill";
import App from "./App";
import DigitalOcean from "./components/DigitalOcean";
import Header from "./components/Header";
import Paypal from "./components/Paypal";
import Spotify from "./components/Spotify";

App.render("#app", [new Spotify(), new DigitalOcean(), new Paypal()]);
App.render("#Header", [new Header()], false);

// import idb from "pouchdb-adapter-idb"
// import RxDB from "rxdb";
// (async () => {
//   RxDB.plugin(idb);
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
