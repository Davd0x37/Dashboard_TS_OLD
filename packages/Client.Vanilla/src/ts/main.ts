import "babel-polyfill";

import { DB } from "./db";
import App from "./lib/App";
import Store from "./store/Store";

(async () => {
  const db = await DB.load();
  await App.init(db);
  await App.loadStore();
  await App.run();

  Store.events.subscribe("stateChange", async () => {
    const user = await App.db.dashboard.findOne().exec();
    console.log(user)
    if (user !== null) {
      user.update({
        $set: {
          ...Store.getter
        }
      });
    } else {
      App.db.dashboard.insert(Store.getter);
    }
  });
})();

// HUSKY

// "husky": {
//   "hooks": {
//     "pre-commit": "yarn test",
//     "pre-push": "yarn test"
//   }
// }

// REACTIVE VUE

// const text = document.querySelectorAll("p");
// const e = (tag: string, content: string | RegExp): any => {
//   const els = {};
//   text.forEach((el: HTMLElement) => {
//     const match = el.textContent && el.textContent.match(content);
//     if (match) {
//       const prop = normalize(match[0]);
//       els[prop] = el;
//     }
//   });

//   return els;
// };

// const normalize = (str: string) => str.replace("{{", "").replace("}}", "");

// const elemenets = e("p", /{{[a-zA-Z0-9_$]+}}/gm);

// const App = {
//   data: {
//     title: "OMG",
//     value: "VALUE"
//   }
// };

// const Vue = new Proxy(App.data, {
//   get(target: any, prop: string, receiver: any) {
//     return Reflect.get(target, prop, receiver);
//   },
//   set(target: any, prop: string, value: any, receiver: any) {
//     elemenets[prop].textContent = value;
//     return Reflect.set(target, prop, value, receiver);
//   }
// });

// const replaceValues = (target: any, elem: any[]) => {
//   for (const prop in target) {
//     if (target[prop]) {
//       elem[prop].textContent = target[prop];
//     }
//   }
// };
