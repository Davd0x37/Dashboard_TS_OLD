// declare namespace JSX {
//   interface IntrinsicElements {
//     readonly [key: string]: any;
//   }
// }

// import { mount } from "./lib/vdom/Mount";

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
// import Component from "./lib/Component";
// import { VElement } from "./lib/vdom/Interfaces";
// import { createElement, mount } from "./lib/vdom/VDOM";
// const root = document.querySelector("#app")!;

// class App extends Component {
//   protected state = {
//     counter: 1
//   };

//   constructor(props?: {}) {
//     super(props);
//   }

//   public ale = () => {
//     this.setState({
//       counter: this.state.counter + 1
//     });
//   };

//   public render(): VElement {
//     return (
//       <div>
//         <p>
//           <a onClick={this.ale}>
//             counter: <p>{this.state.counter}</p>
//           </a>
//         </p>
//       </div>
//     );
//   }
// }

// const mnt = mount(createElement(App, {}), root as HTMLElement);

function createElement(tag: string, props: {}, ...children: any[]) {
  Object.entries(props).forEach(([key, val]) => {
    const eventNames = key.match(/on[a-zA-Z]+/g);
    console.log(eventNames, val)
  })
}
const xd = (
  <div>
    <p classList="btn feed" onclick="click" onmousemove="mousemove">lel</p>
  </div>
);