// import { mount } from "./vdom/Mount";

// import { DB } from "#/db";
// import App from "#/lib/App";
// import Store from "#/store";

// (async () => {
//   const db = await DB.load();
//   App.init(db);
//   App.loadStore();
//   App.run();

//   Store.events.subscribe("stateChange", async () => {
//     const user = await App.db.dashboard.findOne().exec();
//     if (user !== null) {
//       user.update({
//         $set: {
//           ...Store.getter
//         }
//       });
//     } else {
//       App.db.dashboard.insert(Store.getter);
//     }
//   });
// })();


