import "babel-polyfill";
import { DB } from "#/db";
import Events from "#/lib/Observer";
import Store from "#/store";
import Component from "./lib/Component";
import { VElement } from "./vdom/Interfaces";
import { createElement, mount } from "./vdom/VDOM";
import Router from "./lib/Router";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}

// (async () => {
//   const db = await DB.load();

//   const user = await db.dashboard.findOne().exec();
//   if (user !== null) {
//     const data = {
//       id: user.id,
//       User: user.User,
//       Spotify: user.Spotify,
//       DigitalOcean: user.DigitalOcean,
//       Paypal: user.Paypal
//     };
//     await Store.dispatch("UpdateUserData", data);
//   }

//   Events.subscribe("stateChange", async () => {
//     console.log(Store.getter());
//     const userExec = await db.dashboard.findOne().exec();
//     if (userExec !== null) {
//       userExec.update({
//         $set: {
//           ...Store.getter()
//         }
//       });
//     } else {
//       db.dashboard.insert(Store.getter());
//     }
//   });
// })();

class App extends Component {
  constructor(props?: {}) {
    super(props);
  }

  public render(): VElement {
    return (
      <div>
        <Router />
      </div>
    );
  }
}

const root = document.querySelector<HTMLElement>("#app")!;
const mnt = mount(<App />, root);

// type FnType = (...args: any[]) => any;

// class Cont {
//   protected value: any;

//   constructor(val?: any) {
//     this.value = val;
//   }

//   public of(val: any) {
//     return new Cont(val);
//   }

//   public map(fn: FnType) {
//     if (Array.isArray(this.value)) {
//       const val = this.value.map(fn);
//       return new Cont(val);
//     } else {
//       return new Cont(fn(this.value));
//     }
//   }

//   public filter(fn: FnType) {
//     if (Array.isArray(this.value)) {
//       const val = this.value.filter(fn);

//       return new Cont(val);
//     }

//     return new Cont();
//   }
// }

// const c = new Cont();
// c.of({
//   name: "OMG",
//   objs: {
//     en: {
//       lang: "en"
//     },
//     pl: {
//       lang: "PL"
//     }
//   }
// })
//   .map(e => e.objs.pl)
//   .map(e => console.log(e));

// const isNothing = (val: any) => val === null || val === undefined;
// const C = (val: any) => ({
//   of: (fn: FnType) => C(fn(val)),
//   map: (fn: FnType) => {
//     if (isNothing(val)) {
//       return C(null);
//     }
//     if (Array.isArray(val)) {
//       const v = val.map(fn);
//       return C(v);
//     } else {
//       return C(fn(val));
//     }
//   },
//   filter: (fn: FnType) => {
//     if (isNothing(val)) {
//       return C(null);
//     }
//     if (Array.isArray(val)) {
//       const v = val.filter(fn);
//       return C(v);
//     } else {
//       return C(fn(val) ? val : null);
//     }
//   },
//   reduce: (fn: FnType) => {
//     if (isNothing(val)) {
//       return C(null);
//     }
//     if (Array.isArray(val)) {
//       const v = val.reduce(fn);
//       return C(v);
//     } else {
//       return C(fn(val) ? val : null);
//     }
//   },
//   entries: (fn?: FnType) => {
//     if (isNothing(val)) {
//       return C(null);
//     }
//     if (typeof val === "object") {
//       return C(Object.entries(val));
//     } else {
//       return C(val);
//     }
//   }
// });

// C({
//   name: "OMG",
//   objs: {
//     en: {
//       lang: "en"
//     },
//     pl: {
//       lang: "PL"
//     }
//   }
// })
//   .map(e => e.objs)
//   .entries()
//   // .map(e => e * 5)
//   // .filter(e => e % 2 === 0)
//   // .map(e => console.log(e))
//   // .reduce((prev: number, curr: number) => prev + curr)
//   .map(e => console.log(e));
